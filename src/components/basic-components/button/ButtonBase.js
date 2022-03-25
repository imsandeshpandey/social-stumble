import { Button, IconButton, styled, Box } from "@mui/material";
import React, { forwardRef } from "react";
import { borderColor, color as syscolor } from "@mui/system";
import { LoadingButton } from "@mui/lab";

export const Btn = styled(
  forwardRef(
    (
      {
        icon,
        color,
        bgcolor,
        hoverStyles,
        activeStyles,
        restStyles,
        loading,
        border,
        children,
        disabled,
        start,
        end,
        ...p
      },
      ref
    ) => {
      return (
        <Box
          ref={ref}
          component={loading ? LoadingButton : icon ? IconButton : Button}
          loading={loading}
          variant={loading && (border ? "outlined" : "contained")}
          border={border}
          borderColor={borderColor}
          sx={{
            backgroundColor: !loading && bgcolor,
            color: !loading && color,
            boxSizing: "border-box",

            overflow: "hidden",
            "&:hover": {
              ...hoverStyles,
            },
            "&:active": {
              boxShadow: "z8",
              ...activeStyles,
            },
            ...restStyles,
          }}
          {...p}
        >
          {icon ? (
            <>
              {start && (
                <Box component="span" px={1}>
                  {start}
                </Box>
              )}
              {icon}
              {end && (
                <Box component="span" px={1}>
                  {end}
                </Box>
              )}
            </>
          ) : (
            children
          )}
        </Box>
      );
    }
  )
)(
  ({
    theme,
    borderRadius,
    iconSize,
    pd,
    iconColor,
    large,
    loading,
    icon,
    fontSize,
    disabled,
  }) => {
    const base = {
      backgroundColor: disabled && `${theme.palette.grey[400]} !important`,
      transition: "0.1s",
      boxShadow: disabled && `${theme.shadows.z16}`,
      lineHeight: borderColor && 1.54,
      "& .MuiButton-startIcon": {
        marginRight: 4,
      },
      "& .MuiButton-endIcon": {
        marginLeft: 4,
      },
    };
    const loadingStyles = {
      "& .MuiLoadingButton-root.Mui-disabled": {
        borderWidth: "1.5px",
      },
      "&.MuiLoadingButton-loading": {
        boxShadow: "none",
      },
    };
    const common = {
      borderRadius: borderRadius || (large ? 20 : theme.shape.button),
      padding: pd || (large ? theme.spacing(1.3, 2.7) : theme.spacing(1, 2)),
      fontSize: fontSize || (large ? 18 : 14),
    };
    const iconStyles = {
      padding: pd || theme.spacing(1.5, 1.5),
      color: theme.palette[iconColor]?.main || iconColor,
      "& .MuiSvgIcon-root": {
        fontSize: iconSize || (large ? 32 : 24),
      },
      "&.MuiLoadingButton-loading": {
        backgroundColor: "transparent",
        fontSize: iconSize || (large ? 32 : 24),
      },
    };

    return icon
      ? { ...iconStyles }
      : loading
      ? { ...common, ...loadingStyles }
      : { ...common, ...base };
  }
);
