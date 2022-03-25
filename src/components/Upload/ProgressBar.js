import { useTheme } from "@mui/material";
import React from "react";
import { Box } from "../basic-components/base-component/Box";

const Bar = ({ progress, ...props }) => {
  const theme = useTheme();
  return (
    <Box
      width={`${progress}vw`}
      top={0}
      left={0}
      height="3px"
      position="fixed"
      style={{
        backgroundImage: `linear-gradient(270deg,${theme.palette.primary.main} 50%,${theme.palette.info.main})`,
        transition: "all 0.6s ease-out",
        zIndex: 1000,
        ...props.style,
      }}
    />
  );
};

const ProgressBar = ({ progress }) => {
  return (
    <>
      <Bar progress={progress} />
      <Bar progress={progress} style={{ filter: "blur(5px)" }} />
    </>
  );
};

export default ProgressBar;
