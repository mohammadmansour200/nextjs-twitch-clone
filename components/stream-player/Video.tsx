"use client";

import {
	useConnectionState,
	useRemoteParticipant,
	useTracks,
} from "@livekit/components-react";
import { ConnectionState, Track } from "livekit-client";

import { Skeleton } from "../ui/skeleton";
import LiveVideo from "./LiveVideo";
import LoadingVideo from "./LoadingVideo";
import OfflineVideo from "./OfflineVideo";

interface VideoProps {
	hostName: string;
	hostIdentity: string;
}

function Video({ hostIdentity, hostName }: VideoProps) {
	const connectionState = useConnectionState();
	const participant = useRemoteParticipant(hostIdentity);
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone,
	]).filter((track) => track.participant.identity === hostIdentity);

	let content: React.JSX.Element;

	if (!participant && connectionState === ConnectionState.Connected) {
		content = <OfflineVideo username={hostName} />;
	} else if (!participant || tracks.length === 0) {
		content = <LoadingVideo label={connectionState} />;
	} else {
		content = <LiveVideo participant={participant} />;
	}

	return <div className="aspect-video border-b group relative">{content}</div>;
}

export default Video;

export function VideoSkeleton() {
	return (
		<div className="aspect-video border-x border-background">
			<Skeleton className="h-full w-full rounded-none" />
		</div>
	);
}
