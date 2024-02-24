import React, { useEffect, useRef } from "react";
import { usePianoRollStore } from "../../store/piano-roll";
import * as Tone from "tone";
import { Note, useInputStore } from "../../store/input";

const usePianoRollPlayback = () => {
  const { setMultiInput } = useInputStore();
  const { notes, playing, startTime } = usePianoRollStore();
  const currentTime = useRef(0);
  const animationRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(
    null
  );
  const notesPlaying = useRef<Set<Note>>(new Set());

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

    // Find what notes are playing
    // Check if we need to stop any notes from playing
    // We do this because the input system is tied to everything -- including devices
    // So if we constantly return false for all inputs, we'd override incoming inputs
    // This way we "reset" it back to an original position. It'll still collide - but less.
    // @TODO: Create separate "channels" for audio playback (input becomes array, synth goes through array)
    const notesToPlay = allNoteTimes.reduce((combineNotes, rawTime) => {
      const time = Number(rawTime);
      const noteData = notes[time];
      const totalTime = time + noteData.length;
      const isDuring = elapsedTime > time && elapsedTime < totalTime;
      const existsInCache = notesPlaying.current.has(noteData.note);

      // Is note playing + make sure we're not playing already (using cache)
      if (isDuring && !existsInCache) {
        combineNotes[noteData.note] = true;
        // setInput(noteData.note, true);
        notesPlaying.current.add(noteData.note);
      }

      // If it's not during this time, and it's still playing, stop it
      if (!isDuring && existsInCache) {
        combineNotes[noteData.note] = false;
        // setInput(noteData.note, false);
        notesPlaying.current.delete(noteData.note);
      }
      return combineNotes;
    }, {} as Record<Note, boolean>);

    setMultiInput(notesToPlay);

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
