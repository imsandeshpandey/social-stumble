import React from "react";
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
} from "@mui/material";
import { styled } from "@mui/system";
import { Box } from "../base-component/Box";

export const Accordion = styled((p) => (
  <Box component={MuiAccordion} square elevation={0} {...p} />
))(({ theme, disableGutters, bgcolor, restStyles }) => {
  const base = {
    backgroundColor: bgcolor || theme.palette.grey[200],
    "&:before": {
      backgroundColor: theme.palette.grey[300],
    },
    "& .MuiAccordionSummary-expandIconWrapper": {
      color: theme.palette.grey[700],
    },

    "& .Mui-expanded >.MuiAccordionSummary-expandIconWrapper": {
      color: theme.palette.primary[500],
    },

    "&.Mui-disabled": {
      backgroundColor: theme.palette.grey[200],
      "& .MuiAccordionSummary-expandIconWrapper": {
        color: theme.palette.grey[500],
      },
      "& .MuiAccordionSummary": {
        color: theme.palette.grey[600],
      },
    },
  };

  const noGutter = {
    "&.Mui-expanded": {
      borderColor: theme.palette.grey[300],
      boxShadow: theme.shadows.z16,
      borderRadius: theme.shape.button,
    },
  };

  return disableGutters
    ? { ...base, ...restStyles }
    : { ...base, ...noGutter, ...restStyles };
});

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => {
  const base = {
    color: theme.palette.grey[600],
  };
  return { ...base };
});

export const AccordionSummary = styled(MuiAccordionSummary)(({ theme }) => {
  const base = {
    fontWeight: "600",
    color: theme.palette.grey[900],
  };
  return { ...base };
});

Accordion.proptypes = {
  restStyles: "object",
};
