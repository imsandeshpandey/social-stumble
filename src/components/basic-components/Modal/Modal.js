import { useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { Box } from "../base-component/Box";

const Modal = ({ display, children, onCloseModal, ...props }) => {
  const theme = useTheme();
  const divStyles = {
    position: "fixed",
    transform: "translate(-50%,-50%)",
    top: "50%",
    left: "50%",
    display,
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        onCloseModal();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <>
      <Box
        onClick={onCloseModal}
        width="100vw"
        height="100vh"
        style={{
          ...divStyles,
          backgroundColor: `${theme.palette.grey[900]}2a`,
          zIndex: 900,
          backdropFilter: "blur(5px)",
          ...props.overlay?.style,
        }}
        {...props.overlay}
      />

      <Box
        bgcolor="grey.100"
        overflow="hidden"
        style={{
          ...divStyles,
          zIndex: 1000,
          ...props.style,
        }}
        boxShadow="z24"
        borderRadius={theme.shape.button}
        {...props}
      >
        {children}
      </Box>
    </>
  );
};

export default Modal;
