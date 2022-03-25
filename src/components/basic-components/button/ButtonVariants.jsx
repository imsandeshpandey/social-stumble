import { useTheme } from "@mui/material";
import React from "react";
import { useToggleTheme } from "../theme/ThemeContext";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Btn } from "./ButtonBase";
import { Box } from "../base-component/Box";

export const PrimaryBtn = (p) => <Btn boxShadow="primary" {...p} />;
export const SecondaryBtn = (p) => <Btn {...p} />;
export const TertiaryBtn = (p) => <Btn boxShadow="z8" {...p} />;
export const SuccessBtn = (p) => <Btn boxShadow="success" {...p} />;
export const ErrorBtn = (p) => <Btn boxShadow="error" {...p} />;
export const WarningBtn = (p) => <Btn boxShadow="warning" {...p} />;
export const InfoBtn = (p) => <Btn boxShadow="info" {...p} />;
export const IconBtn = (p) => <Btn icon {...p} />;
export const TextBtn = (p) => <Btn {...p} />;

export const ThemeBtn = (p) => {
  const theme = useTheme();
  const light = theme.palette.mode === "light";
  const toggleTheme = useToggleTheme();
  return (
    <Btn
      large
      disableRipple
      color="grey.900"
      boxShadow="z8"
      bgcolor="grey.100"
      sx={{
        aspectRatio: 1,
        overflow: "hidden",
        padding: p.small ? "20px 20px" : "30px 30px",
      }}
      borderRadius="50%"
      icon={
        <Box>
          <Box
            component={LightModeOutlinedIcon}
            height={p.small ? 20 : 30}
            width={p.small ? 20 : 30}
            position="absolute"
            top={light ? 0 : -100}
            padding={p.small ? "10px" : "15px"}
            left={0}
            sx={{
              transition: "top 0.5s",
            }}
          />
          <Box
            component={DarkModeOutlinedIcon}
            height={p.small ? 20 : 30}
            width={p.small ? 20 : 30}
            position="absolute"
            top={!light ? 0 : 100}
            padding={p.small ? "10px" : "15px"}
            left={0}
            sx={{
              transition: "top 0.5s",
            }}
          />
        </Box>
      }
      onClick={toggleTheme}
      {...p}
    />
  );
};

PrimaryBtn.defaultProps = {
  bgcolor: "primary.main",
  color: "white",
  hoverStyles: {
    backgroundColor: "primary.dark",
  },
};
SecondaryBtn.defaultProps = {
  bgcolor: "transparent",
  color: "grey.900",
  style: { border: "1px solid" },
  borderColor: "grey.900",
  hoverStyles: {
    backgroundColor: "#aaaaaa3d",
  },
};

TertiaryBtn.defaultProps = {
  bgcolor: "grey.900",
  color: "grey.100",
  hoverStyles: {
    backgroundColor: "grey.700",
  },
};

SuccessBtn.defaultProps = {
  bgcolor: "success.main",
  color: "white",
  hoverStyles: {
    backgroundColor: "success.dark",
  },
};

ErrorBtn.defaultProps = {
  bgcolor: "error.main",
  color: "white",
  hoverStyles: {
    backgroundColor: "error.dark",
  },
};

WarningBtn.defaultProps = {
  color: "white",
  bgcolor: "warning.main",
  hoverStyles: {
    backgroundColor: "warning.dark",
  },
};

InfoBtn.defaultProps = {
  color: "white",
  bgcolor: "info.main",
  hoverStyles: {
    backgroundColor: "info.dark",
  },
};

IconBtn.defaultProps = {
  color: "grey.700",
};

TextBtn.defaultProps = {
  pd: "0px",
  bg: "transparent",
  borderRadius: "borderRadius",
  color: "grey.900",
  variant: "text",
  activeStyles: {
    boxShadow: "none",
  },
};
