import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";

const reciever = new WebhookReceiver(
	// biome-ignore lint/style/noNonNullAssertion: They should never be null
	process.env.LIVEKIT_API_KEY!,
	// biome-ignore lint/style/noNonNullAssertion: They should never be null
	process.env.LIVEKIT_API_SECRET!,
);

export async function POST(req: NextRequest) {
	const body = await req.text();
	const headerPayload = headers();
	const authorization = headerPayload.get("Authorization");

	if (!authorization) return new Response("Not Authorized", { status: 400 });

	const event = reciever.receive(body, authorization);

	if (event.event === "ingress_started") {
		await db.stream.update({
			where: {
				ingressId: event.ingressInfo?.ingressId,
			},
			data: {
				isLive: true,
			},
		});
	}

	if (event.event === "ingress_ended") {
		await db.stream.update({
			where: {
				ingressId: event.ingressInfo?.ingressId,
			},
			data: {
				isLive: false,
			},
		});
	}

	return new Response("ok", { status: 200 });
}
