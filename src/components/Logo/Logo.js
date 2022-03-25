import React from "react";
import { useTheme } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";

export default function Logo(props) {
  const theme = useTheme();
  return (
    <img
      src={
        theme.palette.mode === "light"
          ? "https://firebasestorage.googleapis.com/v0/b/sandesh-stumble.appspot.com/o/StumbleLogoDark.svg?alt=media&token=2b2474b2-3e0d-4403-b77f-a1fbeffb59c1"
          : "https://firebasestorage.googleapis.com/v0/b/sandesh-stumble.appspot.com/o/StumbleLogoLight.svg?alt=media&token=f3a7f7dc-b4af-4eac-999c-69ba52b4dd9d"
      }
      alt=""
      {...props}
    />
  );
}
