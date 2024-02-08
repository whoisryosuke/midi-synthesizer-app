import BaseSynth from "./BaseSynth";

type Props = {};

const PianoSampler = (props: Props) => {
  return (
    <BaseSynth
      type="Sampler"
      config={{
        urls: {
          C1: "C1.wav",
          C2: "C2.wav",
          C3: "C3.wav",
          C4: "C4.wav",
          C5: "C5.wav",
          C6: "C6.wav",
          C7: "C7.wav",
        },
        baseUrl: "http://localhost:1420/assets/samplers/piano/",
      }}
    />
  );
};

export default PianoSampler;
