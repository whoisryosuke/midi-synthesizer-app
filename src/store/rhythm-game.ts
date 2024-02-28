import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { MIDIFile, MIDITrack } from "../features/RhythmGame/types";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

export interface RhythmGameStore {
  // Is game playing?
  playing: boolean;
  setPlaying: (playing: boolean) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;

  // Current playback time for piano roll
  startTime: number;
  elapsedTime: number;
  setStartTime: (startTime: number) => void;
  setElapsedTime: (elapsedTime: number) => void;

  // Tracks
  currentTrack: number;
  setCurrentTrack: (currentTrack: number) => void;
  midiFile: MIDIFile;
  addMidiFile: (midiFile: MIDIFile) => void;
}

export const useRhythmGameStore = create<RhythmGameStore>()(
  devtools((set) => ({
    playing: false,
    setPlaying: (playing) =>
      set(() => ({
        playing,
      })),
    paused: false,
    setPaused: (paused) =>
      set(() => ({
        paused,
      })),

    startTime: 0,
    elapsedTime: 0,
    setStartTime: (startTime) =>
      set(() => ({
        startTime,
      })),
    setElapsedTime: (elapsedTime) =>
      set(() => ({
        elapsedTime,
      })),

    currentTrack: 0,
    setCurrentTrack: (currentTrack) =>
      set(() => ({
        currentTrack,
      })),
    midiFile: {
      name: "",
      bpm: 0,
      tracks: [],
    },
    addMidiFile: (midiFile) =>
      set((state) => ({
        midiFile: midiFile,
      })),
    // removeTrack: (index) =>
    //   set((state) => ({
    //     tracks: state.tracks.filter((_, trackIndex) => trackIndex === index),
    //   })),
  }))
);
