import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { BaseNote, Note } from "./input";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

export type PianoRollNoteData = {
  time: number;
  length: number;
  note: Note;
};

export interface PianoRollState {
  // Settings
  // The number of pixels that represent 1 second.
  // Increase to "zoom" the timeline or vice versa.
  timeGap: number;

  // Is piano roll playing?
  playing: boolean;
  setPlaying: (playing: boolean) => void;

  // Current playback time for piano roll
  startTime: number;
  currentTime: number;
  setStartTime: (startTime: number) => void;
  setCurrentTime: (currentTime: number) => void;

  // Notes
  notes: Record<number, PianoRollNoteData>;
  addNote: (note: number, noteData: PianoRollNoteData) => void;
  removeNote: (note: number, noteIndex: number) => void;
}

export const usePianoRollStore = create<PianoRollState>()(
  devtools((set) => ({
    timeGap: 30,

    playing: false,
    setPlaying: (playing) =>
      set(() => ({
        playing,
      })),

    startTime: 0,
    currentTime: 0,
    setStartTime: (startTime) =>
      set(() => ({
        startTime,
      })),
    setCurrentTime: (currentTime) =>
      set(() => ({
        currentTime,
      })),

    notes: {},
    addNote: (note, noteData) =>
      set((state) => ({
        notes: {
          ...state.notes,
          [note]: noteData,
        },
      })),
    removeNote: (note) =>
      set((state) => {
        const { [note]: _, ...notes } = state.notes;
        return {
          notes,
        };
      }),
  }))
);
