import { grey } from "@mui/material/colors";
import { lightPalette, darkPalette, restPalette } from "./palette";
import { lightShadows, darkShadows, restShadows } from "./shadows";

const theme = {
  typography: {
    fontFamily: "Public Sans",
    fontWeights: {
      light: 400,
      regular: 500,
      medium: 600,
      bold: 700,
      xbold: 900,
    },
  },
  shape: {
    borderRadius: 16,
    theme: "12px",
    button: "16px",
    modal: "24px",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          whiteSpace: "nowrap",
        },
      },
    },
  },
};

export const themeMode = (mode) => {
  const palette =
    mode === "light"
      ? {
          mode: "light",
          ...lightPalette,
        }
      : {
          mode: "dark",
          ...darkPalette,
        };
  const shadows = mode === "light" ? lightShadows : darkShadows;

  return {
    palette: {
      ...palette,
      secondary: { main: palette.grey[900] },
      ...restPalette,
      background: {
        paper: palette.grey[100],
        default: palette.grey[100],
      },
      text: {
        primary: palette.grey[900],
        secondary: palette.grey[600],
        disabled: palette.grey[400],
      },
      divider: palette.grey[200],
    },
    shadows: { ...shadows, ...restShadows },
    borders: (p) => `1px solid ${palette.grey[p]}`,

    ...theme,
  };
};
