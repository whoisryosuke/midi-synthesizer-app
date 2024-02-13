import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { Theme, base, themes } from "../../themes";
import { useAppStore } from "../../store/app";

/**
 * "Deep merges" two objects only 1 level deep
 * (aka top level of theme like theme.colors)
 * @param objectOne
 * @param objectTwo
 * @returns
 */
const merge = (objectOne, objectTwo) => {
  const objectTwoMap = Object.keys(objectTwo);

  let mergeObj = {
    ...objectOne,
  };

  objectTwoMap.forEach((key) => {
    // Exists? Merge it
    if (key in mergeObj) {
      mergeObj[key] = {
        ...mergeObj[key],
        ...objectTwo[key],
      };
      return;
    }

    mergeObj[key] = objectTwo[key];
  });

  return mergeObj;
};

/* eslint-disable-next-line */
export interface ThemeProviderProps {
  theme?: Partial<Theme>;
}

export function ThemeProvider({
  children,
  theme: themeOverrides,
}: React.PropsWithChildren<ThemeProviderProps>) {
  const { theme } = useAppStore();

  // const colorMode = theme === "light" ? themes.light : themes.dark;
  // @TODO: Put light mode back once colors are consolidated
  const colorMode = theme === "light" ? themes.dark : themes.dark;
  const baseTheme = {
    ...base,
    ...colorMode,
  };
  const currentTheme = merge(baseTheme, themeOverrides);

  return (
    <StyledThemeProvider theme={currentTheme}>{children}</StyledThemeProvider>
  );
}

ThemeProvider.defaultProps = {
  theme: {},
};

export default ThemeProvider;
