import React from "react";
import styled from "styled-components";

// type Props = {}

const Heading = styled("h1")`
  color: ${({ theme }) => theme.colors.text};

  font-family: "Inter";
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes["3"]};
  line-height: ${({ theme }) => theme.fontSizes["4"]};
  text-transform: uppercase;
`;

export default Heading;
