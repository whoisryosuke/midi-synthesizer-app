import React, { useEffect, useRef } from "react";
import { usePianoRollStore } from "../../store/piano-roll";
import * as Tone from "tone";

const usePianoRollPlayback = () => {
  const { notes, playing, startTime } = usePianoRollStore();
  const currentTime = useRef(0);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );

  const allNoteTimes = Object.keys(notes);

  const tickClock = () => {
    currentTime.current = Tone.now();
    console.log(
      "currentTime",
      startTime,
      currentTime,
      currentTime.current - startTime
    );
    const elapsedTime = currentTime.current - startTime;
    const notesToPlay = allNoteTimes.filter((rawTime) => {
      const time = Number(rawTime);
      return time <= elapsedTime + 0.1 && time >= elapsedTime - 0.1;
    });
    console.log("notes to play", notesToPlay);

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
};

export default usePianoRollPlayback;
