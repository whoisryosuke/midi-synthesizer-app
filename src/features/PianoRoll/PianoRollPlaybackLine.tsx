import React, { useEffect, useRef, useState } from "react";
import PianoRollPlaybackMarker from "./PianoRollPlaybackMarker";
import styled from "styled-components";
import * as Tone from "tone";
import { PIANO_ROLL_KEY_WIDTH } from "./piano-roll-constants";

const PianoRollPlaybackLineContainer = styled("div")`
  width: 13px;
  height: 100%;

  position: absolute;
  z-index: 420;

  transform: translateX(var(--left, ${PIANO_ROLL_KEY_WIDTH - 3}px));

  transition: transform 50ms linear;

  & svg {
    position: absolute;
    z-index: 421;
  }
  & svg path {
    fill: ${({ theme }) => theme.colors.piano.marker.background.default};
  }
  &:hover svg path {
    fill: ${({ theme }) => theme.colors.piano.marker.background.hovered};
  }
  &:active svg path {
    fill: ${({ theme }) => theme.colors.piano.marker.background.pressed};
  }
  & svg.playing path {
    fill: ${({ theme }) => theme.colors.piano.marker.background.playing};
  }

  & .line {
    width: 1px;
    height: 100%;
    background: ${({ theme }) => theme.colors.piano.marker.background.default};
    position: absolute;
    left: 6px;
  }
  &:hover .line {
    background: ${({ theme }) => theme.colors.piano.marker.background.hovered};
  }
  &:active .line {
    background: ${({ theme }) => theme.colors.piano.marker.background.pressed};
  }
  & .line.playing {
    background: ${({ theme }) => theme.colors.piano.marker.background.playing};
  }
  & .gradient {
    width: 6px;
    height: 100%;
    position: absolute;
    transition: background 200ms ease-in;
  }
  & .gradient.playing {
    background: ${({ theme }) => theme.gradients.pianoMarker.playing};
  }
`;

type Props = {
  playing: boolean;
  startTime: number;
  timeGap: number;
};

const PianoRollPlaybackLine = ({ playing, startTime, timeGap }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentTime = useRef(0);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );

  const tickClock = () => {
    currentTime.current = Tone.now();
    console.log(
      "currentTime",
      startTime,
      currentTime,
      currentTime.current - startTime
    );
    if (containerRef.current) {
      const elapsedTime = currentTime.current - startTime;
      const scaledTime = elapsedTime * timeGap;
      const leftPosition = scaledTime - 3 + PIANO_ROLL_KEY_WIDTH;
      containerRef.current.style.setProperty("--left", `${leftPosition}px`);
    }

    animationRef.current = requestAnimationFrame(tickClock);
  };

  useEffect(() => {
    if (playing) {
      animationRef.current = requestAnimationFrame(tickClock);
    }
    if (!playing && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      currentTime.current = startTime;
    }
    return () => {
      animationRef.current && cancelAnimationFrame(animationRef.current);
    };
  }, [playing]);

  return (
    <PianoRollPlaybackLineContainer ref={containerRef}>
      <PianoRollPlaybackMarker className={playing && "playing"} />
      <div className={`line ${playing && "playing"}`} />
      <div className={`gradient ${playing && "playing"}`} />
    </PianoRollPlaybackLineContainer>
  );
};

export default PianoRollPlaybackLine;
