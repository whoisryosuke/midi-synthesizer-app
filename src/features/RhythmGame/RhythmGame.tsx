import React, { useEffect, useState } from "react";
import { Midi } from "@tonejs/midi";
import {
  GameState,
  Instruments,
  MIDIFile,
  MIDITrack,
  RhythmNote,
} from "./types";
import { Note } from "../../store/input";
import P5RhythmNoteWaterfall from "./P5RhythmNoteWaterfall";
import * as Tone from "tone";
import Button from "../../components/primitives/Button";
import { useRhythmGameStore } from "../../store/rhythm-game";
import Text from "../../components/primitives/Text";

const DEFAULT_STATE: GameState = {
  playing: false,
  paused: false,
  score: 0,
  timeStart: 0,
  timeElapsed: 0,
};

type Props = {};

const RhythmGame = (props: Props) => {
  const {
    playing,
    setPlaying,
    paused,
    setPaused,
    startTime,
    setStartTime,
    elapsedTime,
    setElapsedTime,
    midiFile,
    addMidiFile,
    score,
  } = useRhythmGameStore();

  const loadMidiFile = async () => {
    // load a midi file in the browser
    const midi = await Midi.fromUrl("songs/zelda-ocarina-of-time.mid");
    if (!midi) return;

    const newMidiFile: MIDIFile = {
      name: midi.name,
      bpm: midi.header.tempos[0]?.bpm ?? 0,
      tracks: [],
    };

    // Process all tracks on MIDI file (track = separate instrument)
    midi.tracks.forEach((track) => {
      // No notes on an instrument? Don't save it
      if (track.notes.length == 0) return;

      // Create the new track
      const newTrack: MIDITrack = {
        instrument: track.instrument.family as Instruments,
        notes: [],
      };

      // Save notes on track
      track.notes.forEach((note) => {
        // console.log("note", note.midi, note.time, note.duration, note.name);
        const newNote: RhythmNote = {
          note: note.name as Note,
          time: note.time,
          duration: note.duration,
          velocity: note.velocity,
        };
        newTrack.notes.push(newNote);
      });

      newMidiFile.tracks.push(newTrack);

      //the control changes are an object
      //the keys are the CC number
      //   track.controlChanges[64];
      //they are also aliased to the CC number's common name (if it has one)
      //   track.controlChanges.sustain.forEach((cc) => {
      // cc.ticks, cc.value, cc.time
      //   });

      //the track also has a channel and instrument
      //track.instrument.name
    });

    addMidiFile(newMidiFile);
  };

  useEffect(() => {
    loadMidiFile();
  }, []);

  console.log(midiFile);

  const handlePlay = () => {
    // Play functionality
    // Not playing yet? Reset the time to now
    if (!playing) {
      setPlaying(true);
      const now = Tone.now();
      setStartTime(now);
      setElapsedTime(0);
    }

    // Pause functionality
    // Playing and not paused? Pause it.
    if (playing && !paused) {
      setPaused(true);
      const now = Tone.now();
      setElapsedTime(now - startTime + elapsedTime);
      console.log("Pausing", now, startTime, now - startTime);
    }
    // Playing and paused? Unpause.
    if (playing && paused) {
      console.log("Unpausing");
      setPaused(false);
      const now = Tone.now();
      setStartTime(now);
    }
  };

  const handleStop = () => {
    setPlaying(false);
    setPaused(false);
    setStartTime(0);
    setElapsedTime(0);
  };

  // Show all tracks with notes beginning 4 seconds or sooner
  // Good for debugging songs that start late (like 5 seconds in)
  //   console.log(
  //     "midi tracks",
  //     midiFile.tracks.filter((track) => track.notes.find((note) => note.time < 4))
  //   );

  return (
    <div>
      <h1>{midiFile?.name ?? "Couldn't load file"}</h1>
      <Text>{score}</Text>
      <Button onClick={handlePlay}>
        {playing ? (paused ? "Resume" : "Pause") : "Play"}
      </Button>
      <Button onClick={handleStop}>Stop</Button>
      <P5RhythmNoteWaterfall
        width={600}
        height={600}
        notes={midiFile?.tracks[0]?.notes ?? []}
      />
    </div>
  );
};

export default RhythmGame;
