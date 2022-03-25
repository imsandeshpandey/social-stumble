import { Clear, SearchOutlined } from "@mui/icons-material";
import {
  InputAdornment,
  styled,
  TextField as MuiTextField,
} from "@mui/material";
import React, { forwardRef, useState } from "react";
import { Box } from "../base-component/Box";
import { IconBtn } from "../button/ButtonVariants";
import { Body, Small } from "../typography/typography";

const TextField = styled(
  forwardRef(
    (
      {
        label,
        subLabel,
        maxLength,
        type = "text",
        disabled = false,
        required,
        search,
        startIcon,
        endIcon,
        ...props
      },
      ref
    ) => {
      const [charCount, setCharCount] = useState(0);
      const [value, setValue] = useState("");
      const handleInputChange = (e) => {
        setValue(e.target.value);
        setCharCount(e.target.value.length);
      };

      return (
        <>
          {label && (
            <Body
              ml={0.5}
              display="block"
              component="label"
              htmlFor={props.name}
              my={0.5}
              color={disabled ? "grey.200" : "grey.800"}
              bold
            >
              {label}
            </Body>
          )}
          {subLabel && (
            <Body m={0} ml={0.5} color="grey.500">
              {subLabel}
            </Body>
          )}
          <MuiTextField
            type={type}
            fullWidth
            required={required}
            inputRef={ref}
            InputProps={{
              maxLength,
              startAdornment:
                startIcon || search ? (
                  <InputAdornment position="start">
                    {startIcon || (search && <SearchOutlined />)}
                  </InputAdornment>
                ) : undefined,

              endAdornment:
                endIcon || (search && value) ? (
                  <InputAdornment
                    color="grey.500"
                    onClick={search ? () => setValue("") : undefined}
                  >
                    {endIcon || (search && <Clear />)}
                  </InputAdornment>
                ) : undefined,
            }}
            variant="outlined"
            disabled={disabled}
            id={props.name}
            value={value}
            onChange={handleInputChange}
            {...props}
          />
          {maxLength && (
            <Small
              textAlign="right"
              color={`${charCount === maxLength ? "error.main" : "grey.500"}`}
            >
              {charCount}/{maxLength}
            </Small>
          )}
        </>
      );
    }
  )
)(({ theme, multiline, ...p }) => ({
  "& .MuiInputBase-root": {
    borderRadius: multiline ? "20px" : theme.shape.theme,
    outline: "none",
    marginTop: "4px",
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[900],
    paddingRight: p.wrapperPr ? p.wrapperPr : p.search || p.endIcon ? 8 : 0,
    paddingLeft: p.wrapperPl ? p.wrapperPl : p.search || p.startIcon ? 8 : 0,
    overflow: "hidden",
    paddingTop: 0,
    paddingBottom: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[400],
    transition: "all 0.1s",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover": {
      "& fieldset": {
        borderColor: theme.palette.grey[800],
      },
    },
    " &.Mui-focused fieldset": {
      borderColor: theme.palette.info.main,
      borderWidth: 1,
    },
  },

  "& .MuiFormHelperText-contained": {
    marginLeft: 0,
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: theme.palette.error.main,
  },
  "& .MuiInputBase-input": {
    paddingRight: p.search || p.endIcon ? 8 : p.px || 16,
    paddingLeft: p.search || p.startIcon ? 2 : p.px || 16,
    paddingTop: p.py,
    paddingBottom: p.py,
    borderRadius: "0 !important",
  },
  "& .MuiOutlinedInput-multiline": {
    padding: 0,
  },
}));

export const HiddenInput = styled(
  React.forwardRef((props, ref) => <input ref={ref} {...props} />)
)({
  display: "none",
});

export const ClearTextField = styled(
  React.forwardRef((props, ref) => (
    <Box color="grey.900" component={MuiTextField} inputRef={ref} {...props} />
  ))
)({
  "& .MuiOutlinedInput-multiline": {
    padding: 0,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover": {
      "& fieldset": {
        border: "none",
      },
    },
    " &.Mui-focused fieldset": {
      border: "none",
    },
  },
  backgroundColor: "transparent",
  outline: "none",
  border: "none",
  "&:active": {
    outline: "none",
    border: "none",
  },
  "&:focus": {
    outline: "none",
    border: "none",
  },
  "&:hover": {
    outline: "none",
    border: "none",
  },
});
export default TextField;
