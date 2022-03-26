import {
  ArrowUpward,
  SendOutlined,
  UploadFileRounded,
  WrapTextOutlined,
} from "@mui/icons-material";
import { Avatar, useTheme } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserData from "../../../firebase/getUserData";
import { Box } from "../../basic-components/base-component/Box";
import { IconBtn, InfoBtn } from "../../basic-components/button/ButtonVariants";
import Flex from "../../basic-components/Flex";
import TextField from "../../basic-components/InputField/Input";
import { Body, Small } from "../../basic-components/typography/typography";
import UploadButton from "../../Upload/UploadButton";

const commentRef = React.createRef();
const CommentSection = ({ children, onComment }) => {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setValue("");
    onComment(value);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <Box>
      <Flex
        alignItems="center"
        gap={1}
        component="form"
        onSubmit={handleSubmit}
      >
        <TextField
          py={4}
          multiline
          placeholder="Add a comment"
          type="text"
          onChange={handleChange}
          value={value}
          required
        />
        <IconBtn
          bgcolor="info.main"
          pd={2}
          type="submit"
          boxShadow="info"
          color="grey.100"
          activeStyles={{ backgroundColor: theme.palette.info.main }}
          hoverStyles={{ backgroundColor: theme.palette.info.main }}
          icon={<SendRounded />}
        />
      </Flex>
      <Box maxHeight="200px" overflow="scroll">
        {children}
      </Box>
    </Box>
  );
};

export const Comment = ({ userId, comment }) => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  useEffect(async () => {
    if (userId) {
      const data = (await getUserData(userId)).data();
      setAuthor(data);
      console.log(1);
    }
  }, []);

  return (
    <Flex px={1} py={0.5}>
      <Flex alignItems="flex-start" gap={1}>
        <Avatar
          onClick={() => navigate(`/${userId}`)}
          sx={{ marginTop: "20px", height: 24, width: 24 }}
          src={author?.userPhoto}
        />
        <Body fontSize={14} color="grey.900">
          <Box
            component="span"
            onClick={() => navigate(`/${userId}`)}
            mr="4px"
            fontWeight="bold"
          >
            {author?.username}
          </Box>
          {comment}
        </Body>
      </Flex>
    </Flex>
  );
};

export default CommentSection;
