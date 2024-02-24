import React, { useEffect } from "react";
import { usePianoRollStore } from "../../store/piano-roll";
import * as Tone from "tone";

type Props = {};

const PianoRollPlayback = (props: Props) => {
  const { playing, currentTime, setStartTime } = usePianoRollStore();

  useEffect(() => {
    if (playing) {
      const now = Tone.now();
      console.log("now playing", now);
      //   setTime(now);
    }
  }, [playing]);

  return <div>PianoRollPlayback</div>;
};

export default PianoRollPlayback;
