import { CircularProgress, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import React, { useEffect, useState, useMemo } from "react";
import {
  ErrorBtn,
  IconBtn,
  SuccessBtn,
} from "../basic-components/button/ButtonVariants";
import { useDropzone } from "react-dropzone";
import UploadModal from "./UploadModal";
import ProgressBar from "./ProgressBar";
import useStorage from "../../firebase/useStorage";
import { Box } from "../basic-components/base-component/Box";
import Modal from "../basic-components/Modal/Modal";
import {
  Body,
  isMobile,
  Title3,
} from "../basic-components/typography/typography";
import { restShadows } from "../basic-components/theme/shadows";

const baseStyle = {
  flex: 1,
  zIndex: 1,
  padding: "51px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: "50% 0 0 0",
  bottom: 0,
  right: 0,
  outline: "none",
  transition: "bottom 0.3s, right 0.3s,padding 0.3s ",
};
const focusedStyle = {
  // borderColor: "#2196f3",
};

const acceptStyle = {
  padding: "200px",
  bottom: "-200px",
  right: "-200px",
  backdropFilter: "blur(10px)",
};

const rejectStyle = {
  padding: "200px",
  bottom: "-200px",
  right: "-200px",
  backdropFilter: "blur(10px)",
};

const UploadButton = () => {
  const acceptedFileTypes = ["image/png", "image/jpeg"];
  const [error, setError] = useState();
  const theme = useTheme();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { progress, uploadFile } = useStorage();
  const {
    acceptedFiles,
    open,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ noClick: true, accept: "image/*" });

  const style = useMemo(() => {
    return {
      ...baseStyle,
      ...(isFocused ? { ...focusedStyle } : {}),
      ...(isDragAccept
        ? { ...acceptStyle, boxShadow: restShadows.success }
        : {}),
      ...(isDragReject ? { ...rejectStyle, boxShadow: restShadows.error } : {}),
    };
  }, [isFocused, isDragAccept, isDragReject]);

  useEffect(() => {
    const data = acceptedFiles?.[0];
    if (data) {
      if (!acceptedFileTypes.includes(data?.type)) {
        setError("Invalid file format.");
        return;
      }
      if (data?.size > 15000000) {
        setError("Max file size is 15.00MB.");
        return;
      }
    }
    setFile(data);
  }, [acceptedFiles[0]]);

  useEffect(() => {
    if (progress === 100) {
      setUploading(false);
      setFile(null);
    }
  }, [progress]);

  return (
    <Box bottom={40} right={40} position="fixed">
      <Box
        {...getRootProps({ style, className: "dropzone" })}
        position="fixed"
        sx={{ zIndex: (isDragAccept || isDragReject) && 9999 }}
        borderColor={
          isDragAccept
            ? "success.main"
            : isDragReject
            ? "error.main"
            : "transparent"
        }
        bgcolor={
          isDragAccept
            ? `${theme.palette.success.main}55`
            : isDragReject
            ? `${theme.palette.error.main}55`
            : "transparent"
        }
      ></Box>
      <Body
        position="absolute"
        width="min-content"
        style={{ zIndex: 0 }}
        bottom="100%"
        right="100%"
        color={isDragAccept ? "success.main" : "error.main"}
      >
        {isDragReject && "Invalid file format."}
      </Body>
      <input {...getInputProps()} />
      <Box>
        <IconBtn
          display={isDragAccept || isDragReject ? "none" : "flex"}
          large
          pd={isMobile() ? 10 : 15}
          iconSize={isMobile() ? 25 : 35}
          style={{
            justifyContent: "center",
            borderRadius: 100,
            alignItems: "center",
            cursor: "pointer",
            // border: "2px solid",
            position: "relative",
            zIndex: 2,
            // borderColor: theme.palette.info.dark,
            backgroundColor: `${theme.palette.grey[100]}77`,
            backdropFilter: "blur(10px)",
          }}
          color="info.dark"
          boxShadow="z8"
          activeStyles={{ boxShadow: "none" }}
          icon={
            file ? (
              <CircularProgress
                size={32}
                sx={{ color: "info.dark" }}
                vairant="determinate"
                value={1}
              />
            ) : (
              <Add />
            )
          }
          onClick={!uploading && open}
        />
        {file && (
          <UploadModal
            file={file}
            onCloseModal={() => setFile(null)}
            onPublish={(description) => {
              uploadFile({ file: { file, description }, post: true });
            }}
          />
        )}
        {error && (
          <Modal onCloseModal={() => setError(null)} sx={{ top: 0 }}>
            <Box p={2}>
              <Body color="grey.900">{error}</Body>
              <ErrorBtn onClick={() => setError(null)} fullWidth>
                Ok
              </ErrorBtn>
            </Box>
          </Modal>
        )}

        <ProgressBar progress={progress} />
      </Box>
    </Box>
  );
};

export default UploadButton;
