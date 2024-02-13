import React from "react";
import Button from "../../primitives/Button";
import Slider from "../../primitives/Slider";
import { Switch } from "react-aria-components";
import PanelContainer from "../../primitives/PanelContainer";
import Knob from "../../primitives/Knob/Knob";

type Props = {};

const TestPanel = (props: Props) => {
  return (
    <PanelContainer
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "250px",
        height: "100vh",
      }}
    >
      <Button>Pump up volume</Button>
      <Slider defaultValue={60}></Slider>
      <Switch>Test switch</Switch>
      <Knob defaultValue={60} />
    </PanelContainer>
  );
};

export default TestPanel;
