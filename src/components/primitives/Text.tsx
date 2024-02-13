import React from "react";
import styled from "styled-components";

// type Props = {}

const Text = styled("p")`
  color: ${({ theme }) => theme.colors.text};

  font-family: "Inter";
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes["1"]};
  line-height: ${({ theme }) => theme.fontSizes["2"]};
`;

export default Text;
