import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { Theme, base, themes } from "../../themes";
import { useAppStore } from "../../store/app";
import generateDarkTheme from "../../themes/colors/dark";

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
  const { theme, colorMode } = useAppStore();

  // @TODO: Put light mode back once colors are consolidated
  const themeStyles =
    theme === "light"
      ? generateDarkTheme(colorMode)
      : generateDarkTheme(colorMode);
  const baseTheme = {
    ...base,
    ...themeStyles,
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
