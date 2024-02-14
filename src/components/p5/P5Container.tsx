import { CSSProperties, PropsWithChildren } from "react";
import styled from "styled-components";
import Heading from "../primitives/Heading";

const P5ContainerTitle = styled("div")`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.colors.input.bg.default};
  text-align: center;

  & h5 {
    padding: ${({ theme }) => theme.space[3]};
    margin: 0;
  }
`;

type P5ContainerBaseProps = {
  width: CSSProperties["width"];
  height: CSSProperties["height"];
};

const P5ContainerBase = styled("div")<P5ContainerBaseProps>`
  width: ${({ width }) => `${width}px` ?? "100%"};
  height: ${({ height }) => `${height}px` ?? "auto"};
  position: relative;
  border-radius: ${({ theme }) => theme.space[4]};
  overflow: hidden;

  & canvas {
    border-radius: ${({ theme }) => theme.space[4]};
  }
`;

type Props = P5ContainerBaseProps & {
  title: string;
};

export const P5Container = ({
  title,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <P5ContainerBase {...props}>
      <P5ContainerTitle>
        <Heading as="h5">{title}</Heading>
      </P5ContainerTitle>
      {children}
    </P5ContainerBase>
  );
};
