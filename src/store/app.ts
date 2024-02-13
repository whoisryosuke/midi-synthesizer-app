import * as Tone from "tone";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { SynthTypes } from "../features/Music/Music";
import { ThemeOptions } from "../themes";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

interface AppState {
  // Theming
  theme: ThemeOptions;
  setTheme: (theme: ThemeOptions) => void;
  toggleTheme: () => void;

  // UI
  showGamepad: boolean;
  setShowGamepad: (showGamepad: boolean) => void;

  // Sound state
  mute: boolean;
  setMute: (mute: boolean) => void;
  synthType: SynthTypes;
  setSynthType: (synthType: SynthTypes) => void;
  fft: React.RefObject<Tone.FFT> | null;
  setFft: (fft: React.RefObject<Tone.FFT>) => void;
}

export const useAppStore = create<AppState>()(
  devtools((set) => ({
    theme: "dark",
    setTheme: (theme) => set((state) => ({ theme })),
    toggleTheme: () =>
      set((state) => ({
        theme: state.theme === "light" ? "dark" : "light",
      })),

    // UI
    showGamepad: true,
    setShowGamepad: (showGamepad) => set((state) => ({ showGamepad })),

    // Sound
    mute: false,
    setMute: (mute) => set((state) => ({ mute })),
    synthType: "poly",
    setSynthType: (synthType) => set((state) => ({ synthType })),
    fft: null,
    setFft: (fft) => set((state) => ({ fft })),
  }))
);
