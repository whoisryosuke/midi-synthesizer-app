import { BASE_COLORS } from "./base";

export const primaryColors = {
  text: BASE_COLORS["gray-0"],
  textOverlay: "rgba(234,234,241,0.7)",
  textInverted: "rgba(16,16,9,1)",
  reading: "rgba(221,221,228,1)",
  background: BASE_COLORS["gray-8"],
  background_level1: "rgba(225,225,225,1)",
  background_level2: "rgba(200,200,200,1)",
  background_level3: "rgba(100,100,100,1)",
  background_overlay: "rgba(0,0,0,0.8)",
  icon: BASE_COLORS["gray-5"],
  button: {
    bg: {
      default: `linear-gradient(180deg, ${BASE_COLORS["gray-7"]} 0%, ${BASE_COLORS["gray-8"]} 65%)`,
      hovered: `linear-gradient(180deg, ${BASE_COLORS["gray-8"]} 0%, ${BASE_COLORS["gray-9"]} 100%)`,
      pressed: `linear-gradient(180deg, ${BASE_COLORS["gray-8"]} 42.5%, ${BASE_COLORS["gray-7"]} 100%)`,
    },
    text: {
      default: BASE_COLORS["gray-0"],
      disabled: "rgba(0,0,0,0.2)",
    },
    border: {
      default: {
        color: BASE_COLORS["gray-9"],
      },
      hovered: {
        color: BASE_COLORS["cyan-5"],
      },
    },
  },
  input: {
    bg: {
      default: BASE_COLORS["gray-9"],
    },
  },
  primary: {
    default: BASE_COLORS["cyan-4"],
    hovered: BASE_COLORS["cyan-5"],
    pressed: BASE_COLORS["cyan-6"],
  },
  // secondary: primaryColors.purple[500],
  muted: "#f6f6f9",
  highlight: "hsla(205, 100%, 40%, 0.125)",
};

export const colors = {
  ...primaryColors,
};

export const gradients = {
  primary: `linear-gradient(90deg, ${BASE_COLORS["cyan-2"]} 0%, ${BASE_COLORS["cyan-4"]} 100%)`,

  // subtle: `linear-gradient(180deg, ${colors.blue['500']} 0%, ${colors.secondary} 100%)`,
  // purple: `linear-gradient(180deg, ${colors.primary} 0%, #A000C4 100%)`,
  none: "none",
  background:
    "radial-gradient(73.75% 106.2% at 5.07% 34.92%, #090909 0%, #141416 100%)",
  glass: {
    border:
      "radial-gradient(253.85% 474.76% at 50% -83.65%, rgba(255, 255, 255, 0.13) 0%, rgba(255, 255, 255, 0.0) 33%, rgba(255, 255, 255, 0.16) 100%)",
  },
  blue: {
    default: `linear-gradient(90deg, #1F1BD8 0%, #4845EF 36.1%)`,
    hover: `linear-gradient(90deg, #4845EF 0%, #1F1BD8 36.1%)`,
  },
  text: {
    blue: {
      default: `-webkit-linear-gradient(90deg, #1F1BD8 0%, #4845EF 36.1%)`,
      hover: `-webkit-linear-gradient(90deg, #4845EF 0%, #1F1BD8 36.1%)`,
    },
    text: {
      default: `-webkit-linear-gradient(90deg, #F6F6E3 0%, #E4E4E9 36.1%)`,
      hover: `-webkit-linear-gradient(90deg, #E4E4E9 0%, #D4D4D9 36.1%)`,
    },
    invert: {
      default: `-webkit-linear-gradient(90deg, #060613 0%, #141419 36.1%)`,
      hover: `-webkit-linear-gradient(90deg, #141419 0%, #242429 36.1%)`,
    },
  },
};

const shadows = {
  // default: {
  //   shadow: {
  //     dark: "0px 2px 8.4px rgba(0, 0, 0, 0.5)",
  //     highlight: "0px 0px 16.4px rgba(255, 255, 255, 0.1)",
  //   },
  //   inner: {
  //     highlight: "inset 0px 3px 2px rgba(255, 255, 255, 0.25)",
  //     shadow: "inset 0px -8px 3px rgba(0, 0, 0, 0.25)",
  //   },
  // },
  default: `0px 2px 8.4px rgba(0, 0, 0, 0.5),
    0px 0px 16.4px rgba(255, 255, 255, 0.1),
    inset 0px 3px 2px rgba(255, 255, 255, 0.25),
    inset 0px -8px 3px rgba(0, 0, 0, 0.25)`,
  hovered: `0px 2px 8.4px rgba(0, 0, 0, 0.5),
      0px 0px 16.4px rgba(255, 255, 255, 0.1),
      inset 0px 3px 2px rgba(255, 255, 255, 0.25),
      inset 0px -8px 3px rgba(0, 0, 0, 0.25)`,
  pressed: `0px 2px 8.4px rgba(0, 0, 0, 0.5),
      0px 0px 16.4px rgba(153, 233, 242, 0.5),
      inset 0px -3px 2px rgba(255, 255, 255, 0.25),
      inset 0px 8px 3px rgba(0, 0, 0, 0.25)`,
  bottomHighlight: `0px 1px 2px rgba(255, 255, 255, 0.25)`,
};

const dark = {
  colors,
  gradients,
  shadows,
};

export default dark;
