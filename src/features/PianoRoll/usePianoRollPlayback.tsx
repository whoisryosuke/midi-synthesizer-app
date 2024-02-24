import React, { useEffect, useRef } from "react";
import { usePianoRollStore } from "../../store/piano-roll";
import * as Tone from "tone";
import { Note } from "../../store/input";

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
    const notesToPlay = allNoteTimes.reduce((combineNotes, rawTime) => {
      const time = Number(rawTime);
      const noteData = notes[time];
      const totalTime = time + noteData.length;
      const isBefore = time <= elapsedTime + 0.1;
      const isAfter = time >= elapsedTime - 0.1;
      const isDuring = elapsedTime > time && elapsedTime < totalTime;
      if ((isBefore && isAfter) || isDuring) {
        combineNotes[noteData.note] = true;
      }
      return combineNotes;
    }, {} as Record<Note, boolean>);
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
