"use server";

import { db } from "@/lib/db";
import { getSelf } from "@/services/auth-service";
import {
	type CreateIngressOptions,
	IngressAudioEncodingPreset,
	IngressClient,
	IngressInput,
	IngressVideoEncodingPreset,
	RoomServiceClient,
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
	process.env.LIVEKIT_API_URL as string,
	process.env.LIVEKIT_API_KEY,
	process.env.LIVEKIT_API_SECRET,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL as string);

export async function resetIngress(hostIdentity: string) {
	const ingresses = await ingressClient.listIngress({ roomName: hostIdentity });

	const rooms = await roomService.listRooms([hostIdentity]);

	for (const room of rooms) {
		await roomService.deleteRoom(room.name);
	}

	for (const ingress of ingresses) {
		if (ingress.ingressId) await ingressClient.deleteIngress(ingress.ingressId);
	}
}

export async function createIngress(ingressType: IngressInput) {
	const self = await getSelf();

	await resetIngress(self?.user?.userId as string);

	const options: CreateIngressOptions = {
		name: self?.user?.name as string,
		roomName: self?.user?.userId,
		participantName: self?.user?.username,
		participantIdentity: self?.user?.userId,
	};

	if (ingressType === IngressInput.WHIP_INPUT) {
		options.bypassTranscoding = true;
	} else {
		options.video = {
			source: TrackSource.CAMERA,
			preset: IngressVideoEncodingPreset.H264_1080P_30FPS_1_LAYER,
		};
		options.audio = {
			source: TrackSource.MICROPHONE,
			preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
		};
	}

	const ingress = await ingressClient.createIngress(ingressType, options);

	if (!ingress || !ingress.url || !ingress.streamKey)
		throw new Error("Failed to create ingress");

	await db.stream.update({
		where: {
			userId: self?.user?.userId,
		},
		data: {
			ingressId: ingress.ingressId,
			serverUrl: ingress.url,
			streamKey: ingress.streamKey,
		},
	});

	revalidatePath(`/u/${self?.user?.username}/keys`);
	return ingress;
}
