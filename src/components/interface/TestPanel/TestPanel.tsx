import React from "react";
import Button from "../../primitives/Button";
import Slider from "../../primitives/Slider";
import PanelContainer from "../../primitives/PanelContainer";
import Knob from "../../primitives/Knob/Knob";
import ToggleButton from "../../primitives/ToggleButton";
import Stack from "../../Stack/Stack";
import Heading from "../../primitives/Heading";
import Switch from "../../primitives/Switch";
import P5FFTLineShapeViz from "../../p5/P5FFTLineShapeViz";
import P5WaveformLineShapeViz from "../../p5/P5WaveformLineShapeViz";

type Props = {};

const TestPanel = (props: Props) => {
  return (
    <PanelContainer
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "50%",
        height: "100vh",
        padding: "30px",
      }}
    >
      <Stack vertical>
        <Heading as="h3">MIDI Settings</Heading>
        <Stack>
          <Button>Pump up volume</Button>
        </Stack>
        <Slider defaultValue={60}></Slider>
        <Stack>
          <P5WaveformLineShapeViz width={300} height={200} />
          <P5FFTLineShapeViz width={300} height={200} />
        </Stack>
        <Stack>
          <ToggleButton label="MIDI" />
          <ToggleButton label="Crossfade" active />
          <ToggleButton label="Mic" />
          <ToggleButton label="Effects" />
        </Stack>
        <Switch>Enable audio mixing</Switch>
        <Stack style={{ marginTop: "20px" }}>
          <Switch vertical>Channel #1</Switch>
          <Switch vertical>Channel #2</Switch>
          <Switch vertical>Channel #3</Switch>
        </Stack>
        <Stack style={{ display: "flex", flexDirection: "row" }}>
          <Knob label="Volume" defaultValue={60} />
          <Knob label="Mix #1" defaultValue={60} showOutput />
        </Stack>
      </Stack>
    </PanelContainer>
  );
};

export default TestPanel;
