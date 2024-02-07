# MIDI Keyboard 3D Music Visualizer

Visualize your MIDI keyboard (or regular keyboard) with a library of 3D effects. Great for streaming, performance, or fun.

## Getting Started

This app uses the [Tauri](https://tauri.app/) framework to ship a desktop app with a web frontend. You can either spin the app up in your browser for development purposes, or run the desktop app for a more production experience.

1. Clone the repo
1. Install the deps: `yarn`
1. Run the web app: `yarn dev`
1. Or you can run the desktop app: `yarn tauri dev`

## How it works

We use the WebMidi API to grab MIDI instruments (or the Web Keyboard API) using the `<MidiKeyboard />` component and keeps the input synced with a Zustand data store.

The app then "reacts" to the input, like the `<Music />` component which will play the appropriate MIDI tones using Tone.js. The music is visualized using WebGL, run through a pairing of ThreeJS and React Three Fiber, and animated using React Spring.
