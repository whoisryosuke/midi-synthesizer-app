import React from "react";
import styled from "styled-components";

// type Props = {}

const PanelContainer = styled("div")`
  background: ${({ theme }) => theme.colors.background};
`;

export default PanelContainer;
