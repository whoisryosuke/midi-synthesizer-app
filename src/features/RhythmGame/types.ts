import { Note } from "../../store/input";

// MIDI TYPES

// This is technically "family" - and the instrument has a "name"
// e.g. family = guitar, name = Acoustic Guitar
// Later might be interesting to save name to see if we can match to more exact sample
export type Instruments =
  | "pipe"
  | "reed"
  | "organ"
  | "guitar"
  | "ensemble"
  | "strings"
  | "drums"
  | "strings";

export type RhythmNote = {
  note: Note;
  time: number;
  duration: number;
  velocity: number;
};

export type MIDITrack = {
  instrument: Instruments;
  notes: RhythmNote[];
};

export type MIDIFile = {
  name: string;
  bpm: number; // Assume constant now - but ideally allow for an array for changes mid-song
  tracks: MIDITrack[];
};

// GAME TYPES

export type GameState = {
  // Has game started?
  playing: boolean;
  // Is game paused?
  paused: boolean;
  // User's score
  score: number;

  // Represents number when playback starts to measure how much time has passed
  timeStart: number;
  // We use elapsed time to store the time passed since last playback
  // this allows user to pause and keep placement
  timeElapsed: number;
};
