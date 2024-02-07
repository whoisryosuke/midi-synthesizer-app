import React, { useEffect, useRef } from "react";
import { Note, UserInputMap, useInputStore } from "../store/input";
import * as Tone from "tone";

type Props = {};

const Music = (props: Props) => {
  const notesPlaying = useRef<UserInputMap>({});
  const { input } = useInputStore();
  // Create a synth and connect it to the main output (your speakers)
  const synth = useRef<Tone.PolySynth | null>(null);
  const inputKeys = Object.keys(input) as Note[];

  useEffect(() => {
    const now = Tone.now();
    if (!synth.current) return;

    // Find out what input changed
    const pressedKeys = inputKeys.filter(
      (key) => input[key] && !notesPlaying.current[key]
    );
    const releasedKeys = inputKeys.filter(
      (key) => !input[key] && notesPlaying.current[key]
    );

    pressedKeys.forEach((key) => {
      Tone.start();
      //   console.log("playing note!");
      synth.current?.triggerAttack(key, now);
      notesPlaying.current[key] = true;
    });

    releasedKeys.forEach((key) => {
      Tone.start();
      //   console.log("releasing note!");
      synth.current?.triggerRelease(key, now);
      notesPlaying.current[key] = false;
    });

    if (pressedKeys.length == 0) synth.current.releaseAll(now + 3);
  }, [input]);

  useEffect(() => {
    if (!synth.current) {
      synth.current = new Tone.PolySynth().toDestination();
    }
  }, []);

  return <></>;
};

export default Music;
