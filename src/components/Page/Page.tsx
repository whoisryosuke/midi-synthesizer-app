import React, { PropsWithChildren } from "react";
import ThemeProvider from "../ThemeProvider/ThemeProvider";

type Props = {};

const Page = ({ children }: PropsWithChildren<Props>) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export default Page;
