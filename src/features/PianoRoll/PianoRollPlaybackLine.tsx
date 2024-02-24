import React, { useEffect, useRef, useState } from "react";
import PianoRollPlaybackMarker from "./PianoRollPlaybackMarker";
import styled from "styled-components";
import * as Tone from "tone";
import { PIANO_ROLL_KEY_WIDTH } from "./piano-roll-constants";

type PianoRollPlaybackLineContainerProps = {
  left: number;
};

const PianoRollPlaybackLineContainer = styled(
  "div"
)<PianoRollPlaybackLineContainerProps>`
  width: 13px;
  height: 100%;

  position: absolute;
  z-index: 420;

  left: ${({ left }) => left - 3 + PIANO_ROLL_KEY_WIDTH}px;

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
  const [currentTime, setCurrentTime] = useState(0);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );

  const tickClock = () => {
    setCurrentTime(Tone.now());
    console.log("currentTime", startTime, currentTime, currentTime - startTime);

    animationRef.current = requestAnimationFrame(tickClock);
  };

  useEffect(() => {
    if (playing) {
      animationRef.current = requestAnimationFrame(tickClock);
    }
    if (!playing && animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      setCurrentTime(startTime);
    }
    return () => {
      animationRef.current && cancelAnimationFrame(animationRef.current);
    };
  }, [playing]);

  const elapsedTime = currentTime - startTime;

  return (
    <PianoRollPlaybackLineContainer left={timeGap * elapsedTime}>
      <PianoRollPlaybackMarker className={playing && "playing"} />
      <div className={`line ${playing && "playing"}`} />
      <div className={`gradient ${playing && "playing"}`} />
    </PianoRollPlaybackLineContainer>
  );
};

export default PianoRollPlaybackLine;
