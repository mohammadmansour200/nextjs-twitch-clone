"use client";

import { useTracks } from "@livekit/components-react";
import { type Participant, Track } from "livekit-client";
import { useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import FullscreenControl from "./FullscreenControl";
import VolumeControl from "./VolumeControl";

interface LiveVideoProps {
	participant: Participant;
}

function LiveVideo({ participant }: LiveVideoProps) {
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [volume, setVolume] = useState(0);

	const videoRef = useRef<HTMLVideoElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useTracks([Track.Source.Camera, Track.Source.Microphone])
		.filter((track) => track.participant.identity === participant.identity)
		.forEach((track, _i) => {
			if (videoRef.current) {
				track.publication.track?.attach(videoRef.current);
			}
		});

	function onFullscreenToggle() {
		if (isFullscreen) document.exitFullscreen();
		else if (wrapperRef.current) wrapperRef.current.requestFullscreen();
	}

	function handleFullscreenChange() {
		const isCurrentlyFullscreen = document.fullscreenElement !== null;
		setIsFullscreen(isCurrentlyFullscreen);
	}
	useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

	function onVolumeChange(value: number) {
		setVolume(+value);

		if (videoRef?.current) {
			videoRef.current.muted = value === 0;
			videoRef.current.volume = +value * 0.01;
		}
	}

	function onToggleMute() {
		const isMuted = volume === 0;
		setVolume(isMuted ? 50 : 0);

		if (videoRef?.current) {
			videoRef.current.muted = !isMuted;
			videoRef.current.volume = isMuted ? 0.5 : 0;
		}
	}

	return (
		<div className="relative h-full flex" ref={wrapperRef}>
			{/* biome-ignore lint/a11y/useMediaCaption: There is no tracks for streams :) */}
			<video
				onLoadedMetadata={() => onVolumeChange(0)}
				width="100%"
				ref={videoRef}
			/>
			<div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
				<div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
					<VolumeControl
						onToggle={onToggleMute}
						value={volume}
						onChange={onVolumeChange}
					/>
					<FullscreenControl
						isFullscreen={isFullscreen}
						onToggle={onFullscreenToggle}
					/>
				</div>
			</div>
		</div>
	);
}

export default LiveVideo;
