import React from "react";
import {
  Slider as AriaSlider,
  Label as AriaLabel,
  SliderOutput as AriaSliderOutput,
  SliderThumb as AriaSliderThumb,
  SliderTrack as AriaSliderTrack,
} from "react-aria-components";
import styled from "styled-components";
import { BUTTON_STYLES } from "../../themes/styles/button";

const SliderBase = styled(AriaSlider)`
  display: grid;
  grid-template-areas:
    "label output"
    "track track";
  grid-template-columns: 1fr auto;
  max-width: 300px;
  color: var(--text-color);

  &[data-orientation="horizontal"] {
    flex-direction: column;
    width: 300px;
  }

  &[data-orientation="vertical"] {
    height: 150px;
    display: block;
  }
`;

const Label = styled(AriaLabel)`
  grid-area: label;
  color: ${({ theme }) => theme.colors.text};

  &[data-orientation="vertical"] {
    display: none;
  }
`;

const SliderOutput = styled(AriaSliderOutput)`
  grid-area: output;
  color: ${({ theme }) => theme.colors.text};

  &[data-orientation="vertical"] {
    display: none;
  }
`;

const SliderThumb = styled(AriaSliderThumb)`
  ${BUTTON_STYLES}

  width: 23px;
  height: 25px;
  forced-color-adjust: none;

  border-radius: ${({ theme }) => theme.space[3]};

  &[data-dragging] {
    background: ${({ theme }) => theme.colors.button.bg.pressed};
  }

  &[data-orientation="horizontal"] {
    top: 50%;
  }
  &[data-orientation="vertical"] {
    left: 50%;
  }
`;

const SliderTrack = styled(AriaSliderTrack)`
  grid-area: track;
  position: relative;
  /* track line */
  &:before {
    content: "";
    display: block;
    position: absolute;
    background: var(--border-color);
  }

  &[data-orientation="horizontal"] {
    height: 30px;
    width: 100%;

    &:before {
      height: 3px;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &[data-orientation="vertical"] {
    width: 30px;
    height: 100%;

    &:before {
      width: 3px;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  background: ${({ theme }) => theme.colors.background};
`;

type Props = typeof AriaSlider & {
  label?: string;
};

const Slider = ({ label, ...props }: Props) => {
  return (
    <SliderBase {...props}>
      {label && <Label>{label}</Label>}
      <SliderOutput />
      <SliderTrack>
        <SliderThumb />
      </SliderTrack>
    </SliderBase>
  );
};

export default Slider;
