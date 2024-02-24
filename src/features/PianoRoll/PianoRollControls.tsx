import React from "react";
import Button from "../../components/primitives/Button";
import { usePianoRollStore } from "../../store/piano-roll";
import * as Tone from "tone";

type Props = {};

const PianoRollControls = (props: Props) => {
  const { playing, setPlaying, setStartTime } = usePianoRollStore();

  const handlePlayClick = () => {
    setPlaying(!playing);

    // Reset the time to now
    if (!playing) {
      const now = Tone.now();
      setStartTime(now);
    }
  };

  return (
    <div>
      <Button onClick={handlePlayClick}>{playing ? "Stop" : "Play"}</Button>
    </div>
  );
};

export default PianoRollControls;
