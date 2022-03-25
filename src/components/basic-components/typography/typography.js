import { useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { Box } from "../base-component/Box";
import { text } from "./text";

export function isMobile() {
  // eslint-disable-next-line
  const theme = useTheme();
  // eslint-disable-next-line
  return useMediaQuery(theme.breakpoints.down("sm"));
}

export const Display = (props) => (
  <Box
    component="div"
    {...text[isMobile() ? "title1" : "display"]}
    {...props}
  />
);

/**
 * Title1 font, a wrapper of Mui Box
 * @param props Mui Box props
 */
export const Title1 = (props) => (
  <Box component="h1" {...text[isMobile() ? "title2" : "title1"]} {...props} />
);

/**
 * Title2 font, a wrapper of Mui Box
 * @param props Mui Box props
 */
export const Title2 = (props) => (
  <Box component="h2" {...text[isMobile() ? "title3" : "title2"]} {...props} />
);

/**
 * Title3 font, a wrapper of Mui Box
 * @param props Mui Box props
 */
export const Title3 = (props) => (
  <Box
    component="h3"
    {...text[isMobile() ? "large" : "title3"]}
    fontWeight={props.bold ? 700 : 600}
    {...props}
  />
);

/**
 * Large font, a wrapper of Mui Box
 * @param props Mui Box props
 * @param props.bold
 */
export const Large = ({ bold, ...props }) => (
  <Box component="p" {...text.large} fontWeight={bold ? 600 : 400} {...props} />
);

/**
 * Body font, a wrapper of Mui Box
 * @param props Mui Box props
 * @param props.bold
 */
export const Body = ({ bold, ...props }) => (
  <Box component="p" {...text.body} fontWeight={bold ? 600 : 400} {...props} />
);

/**
 * Small font, a wrapper of Mui Box
 * @param props Mui Box props
 * @param props.bold
 */
export const Small = ({ bold, ...props }) => (
  <Box component="p" {...text.small} fontWeight={bold ? 500 : 400} {...props} />
);
