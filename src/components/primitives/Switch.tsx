import React, { PropsWithChildren } from "react";
import { Switch as AriaSwitch } from "react-aria-components";
import styled from "styled-components";

const Indication = styled("div")`
  background: teal;
`;

// type Props = {}

const StyledSwitch = styled(AriaSwitch)`
  background: ${({ theme }) => theme.colors.button.default};
  border: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.button.hovered};
    border: 0;
  }

  &:active {
    background: ${({ theme }) => theme.colors.button.pressed};
    color: ${({ theme }) => theme.colors.button.pressedText};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.button.disabledText};
  }
`;

const Switch = ({ children }: PropsWithChildren) => {
  return (
    <StyledSwitch>
      <Indication className="indicator" />
      {children}
    </StyledSwitch>
  );
};

export default Switch;
