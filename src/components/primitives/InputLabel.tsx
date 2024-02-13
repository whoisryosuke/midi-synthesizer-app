import React from "react";
import styled from "styled-components";
import Text from "./Text";

// type Props = {}

const InputLabel = styled(Text)`
  font-size: ${({ theme }) => theme.fontSizes["0"]};
`;

export default InputLabel;
