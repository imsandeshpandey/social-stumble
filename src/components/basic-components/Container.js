import { styled } from "@mui/material";
import React from "react";
import { Box } from "./base-component/Box";

const Container = ({ children, p }) => {
  return (
    <Box mx="auto" maxWidth={935} width={["90%", "90%", "90%"]} {...p}>
      {children}
    </Box>
  );
};

export default Container;
