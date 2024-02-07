import React, { useEffect, useState } from "react";
import useKeyPress from "../hooks/useKeyPress";
import { Note, useInputStore } from "../store/input";

const KEY_MAP: Record<KeyboardEvent["key"], Note> = {
  a: "C1",
  s: "C2",
  d: "C3",
  f: "C4",
  g: "C5",
  h: "C6",
  j: "C7",
};

type Props = {};

const Keyboard = (props: Props) => {
  const { input, setInput } = useInputStore();
  const keys = Object.keys(KEY_MAP);

  // If pressed key is our target key then set to true
  function downHandler({ key }: KeyboardEvent): void {
    if (keys.includes(key)) {
      const noteKey = KEY_MAP[key];
      if (!input[noteKey]) setInput(noteKey, true);
    }
  }
  // If released key is our target key then set to false
  const upHandler = ({ key }: KeyboardEvent): void => {
    if (keys.includes(key)) {
      const noteKey = KEY_MAP[key];
      setInput(noteKey, false);
    }
  };

  // Add event listeners for keypress
  useEffect(() => {
    if (typeof window == "undefined") return;

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return <></>;
};

export default Keyboard;
