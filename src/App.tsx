import { NoteMessageEvent, WebMidi } from "webmidi";
import { useEffect, useState } from "react";
import "./App.css";
import MidiKeyboard from "./features/MidiKeyboard";
import Scene from "./components/Scene/Scene";
import Music from "./features/Music";
import Keyboard from "./features/Keyboard";
import P5Particles from "./components/p5/P5Test/P5Particles";
import KeyboardUI from "./components/KeyboardUI/KeyboardUI";

export default function App() {
  return (
    <div className="App">
      <MidiKeyboard />
      {/* <Scene /> */}
      <P5Particles />
      <Music />
      <Keyboard />
      <KeyboardUI />
    </div>
  );
}
