// import React from "react";
// import {
//   TextField as MuiTextField,
//   Box,
//   styled,
//   Icon,
//   withStyles,
// } from "@material-ui/core";
// import { compose, spacing } from "@material-ui/system";

// const BaseInput = ({ label, subLabel, ...p }) => {
//   return (
//     <>
//       {label && <Text>{label}</Text>}
//       <MuiTextField variant="outlined" {...p} />
//       {icon2 && <Box component={icon2} paddingLeft="5px" />}
//     </>
//   );
// };

// const TextField = styled(BaseInput)(
//   compose(
//     ({ theme, bgcolor }) => ({
//       "& .MuiInputBase-root": {
//         marginTop: "4px",
//         borderRadius: "100px",
//         backgroundColor: bgcolor ? bgcolor : "transparent",
//         // "&:hover": {
//         //   borderColor: "#fff !important",
//         // },
//         "&:active": {
//           borderColor: "#ccc",
//         },
//       },
//       "& .MuiFormHelperText-contained": {
//         marginLeft: 0,
//       },
//       "& .MuiFormHelperText-root.Mui-error": {
//         color: theme.palette.danger.main,
//       },
//       "& .MuiInputBase-input": {
//         padding: "10.5px 16px",
//       },
//       "& .MuiOutlinedInput-multiline": {
//         padding: 0,
//       },
//     }),
//     spacing
//   )
// );

// import { Box, styled, TextField as MuiTextField } from "@material-ui/core";
// import { compose, spacing } from "@material-ui/system";
// import React from "react";
// import { Button } from "../button/ButtonBase";
// import Flex from "../Flex";
// import { Text } from "../typography/typography";

// const BaseInput = ({
//   label,
//   subLabel,
//   maxLength,
//   disabled,
//   onChange,
//   width,
//   height,
//   buttonLabel,
//   onClick,
//   hasButton,
//   ...props
// }) => (
//   <Flex alignItems="flex-start" flexDirection="column">
//     {label && (
//       <Text
//         marginBottom="6px"
//         paddingLeft="10px"
//         color={disabled ? "#aaa" : ""}
//         fontSize="16px"
//         medium
//       >
//         {label}
//       </Text>
//     )}

//     <Flex alignItems="stretch">
//       {subLabel && (
//         <Text marginRight="4px" noWrap width="fit-content" color="#444">
//           {subLabel}:
//         </Text>
//       )}
//       <MuiTextField type="text" fullWidth variant="outlined" {...props} />
//       {hasButton && (
//         <Button onclick={onClick} padding="21px" borderRadius="0 100px 100px 0">
//           <Text noWrap>{buttonLabel}</Text>
//         </Button>
//       )}
//     </Flex>
//   </Flex>
// );

// const TextField = styled(BaseInput)(/   compose(
//     ({ theme, bgcolor, multiline, borderRadius, hasButton, size = 1 }) => ({
//       "& .MuiInputBase-root": {
//         borderRadius: hasButton
//           ? "100px 0 0 100px"
//           : borderRadius
//           ? borderRadius
//           : multiline
//           ? "20px"
//           : "100px",
//         backgroundColor: bgcolor && bgcolor,
//       },
//       "& .MuiInputBase-input": {
//         transition: "10s",
//         padding:
//           size === 1
//             ? "10px 16px"
//             : size === 2
//             ? "14px 20px"
//             : size === 3
//             ? "18px 24px"
//             : size === 4 && "22px 28px",
//       },
//       "& .MuiOutlinedInput-multiline": {
//         padding: 0,
//       },
//     }),
//     spacing
//   )
// );

// export default TextField;

