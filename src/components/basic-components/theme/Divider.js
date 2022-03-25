import React from "react";
import { styled } from "@mui/system";
import { Box } from "../base-component/Box";

export const Divider = styled((p) => <Box component="hr" {...p} />)({
  border: "none",
});
