import React from "react";
import { Box } from "../basic-components/base-component/Box";
import { Small } from "../basic-components/typography/typography";

export const Connections = (p) => {
  return (
    <Box display="flex" gap="10%">
      <Small color="grey.800">
        <b>568</b> Followers
      </Small>
      <Small color="grey.800">
        <b>124</b> Following
      </Small>
    </Box>
  );
};
