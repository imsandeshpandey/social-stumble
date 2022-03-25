import React from "react";
import { DynamicFeed } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import { Box } from "../basic-components/base-component/Box";
import { Small } from "../basic-components/typography/typography";

export const PostsCount = (p) => {
  const theme = useTheme();
  return (
    <Box
      style={{
        border: "1px solid",
        borderColor: theme.palette.info.dark,
      }}
      display="inline-flex"
      maxHeight="20px"
      alignItems="center"
      px={1}
      borderRadius="500px"
      position="relative"
      width="fit-content"
      overflow="hidden"
      {...p}
    >
      <Small fontSize="10px" color="info.dark">
        {p.count}
      </Small>

      <Box
        // sx={{ zIndex: 1 }}
        component={DynamicFeed}
        height="16px"
        color="info.dark"
      />
      <Box
        position="absolute"
        height="120%"
        width="120%"
        top={0}
        left={0}
        bgcolor="info.main"
        sx={{ opacity: 0.1 }}
      />
    </Box>
  );
};
