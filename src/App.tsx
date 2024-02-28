import "./App.css";
import MidiKeyboard from "./features/MidiKeyboard";
import Music from "./features/Music/Music";
import Keyboard from "./features/Keyboard";
import P5Particles from "./components/p5/P5Test/P5Particles";
import KeyboardUI from "./components/KeyboardUI/KeyboardUI";
import P5FFTDebug from "./components/p5/P5FFTDebug";
import Page from "./components/Page/Page";
import TestPanel from "./components/interface/TestPanel/TestPanel";
import P5FFTLineViz from "./components/p5/P5FFTLineViz";
import P5FFTLineShapeViz from "./components/p5/P5FFTLineShapeViz";
import MusicSwitcher from "./features/Music/MusicSwitcher";
import PianoRoll from "./features/PianoRoll/PianoRoll";
import RhythmGame from "./features/RhythmGame/RhythmGame";

export default function App() {
  return (
    <Page>
      <div className="App">
        <MidiKeyboard />
        {/* <Scene /> */}
        {/* <P5Particles /> */}
        {/* <P5FFTDebug /> */}
        {/* <P5FFTLineViz /> */}
        {/* <PianoRoll /> */}
        <RhythmGame />
        <MusicSwitcher />
        <Keyboard />
        <KeyboardUI />
        <TestPanel />
      </div>
    </Page>
  );
}
