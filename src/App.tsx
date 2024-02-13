import "./App.css";
import MidiKeyboard from "./features/MidiKeyboard";
import Music from "./features/Music/Music";
import Keyboard from "./features/Keyboard";
import P5Particles from "./components/p5/P5Test/P5Particles";
import KeyboardUI from "./components/KeyboardUI/KeyboardUI";
import P5FFTDebug from "./components/p5/P5FFTDebug";
import Page from "./components/Page/Page";
import TestPanel from "./components/interface/TestPanel/TestPanel";

export default function App() {
  return (
    <Page>
      <div className="App">
        <MidiKeyboard />
        {/* <Scene /> */}
        {/* <P5Particles /> */}
        <P5FFTDebug />
        <Music />
        <Keyboard />
        <KeyboardUI />
        <TestPanel />
      </div>
    </Page>
  );
}
