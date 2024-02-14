import styled from "styled-components";

export const P5Container = styled("div")`
  & canvas {
    border-radius: ${({ theme }) => theme.space[4]};
  }
`;
