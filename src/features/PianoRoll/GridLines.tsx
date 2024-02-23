import React, { CSSProperties } from "react";
import styled from "styled-components";

type Props = {
  gap?: CSSProperties["width"];
};

export const RowLines = styled("div")<Props>`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  background: repeating-linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.background_level1},
    ${({ theme }) => theme.colors.background_level1} 2px,
    transparent 2px,
    transparent ${({ gap }) => gap}
  );
  background-size: 100% ${({ gap }) => gap};
`;

export const ColumnLines = styled("div")<Props>`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  background: repeating-linear-gradient(
    to right,
    ${({ theme }) => theme.colors.background_level1},
    ${({ theme }) => theme.colors.background_level1} 2px,
    transparent 2px,
    transparent ${({ gap }) => gap}
  );
  background-size: ${({ gap }) => gap} 100%;
`;

ColumnLines.defaultProps = {
  gap: "30px",
};

RowLines.defaultProps = {
  gap: "30px",
};
