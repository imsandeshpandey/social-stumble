import {
  ForumOutlined,
  MoreVert,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Avatar, Container, Menu, MenuItem } from "@mui/material";
import { navigate } from "@storybook/addon-links";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../firebase/AuthContext";
import { database } from "../../../firebase/config";
import getUserData from "../../../firebase/getUserData";
import { Box } from "../../basic-components/base-component/Box";
import { Btn } from "../../basic-components/button/ButtonBase";
import {
  ErrorBtn,
  IconBtn,
  TextBtn,
} from "../../basic-components/button/ButtonVariants";
import Modal from "../../basic-components/Modal/Modal";
import { Body, Small } from "../../basic-components/typography/typography";
import CommentSection, { Comment } from "./CommentSection";

const PostModal = ({ postId, onCloseModal, onConfirmDelete }) => {
  const [showAllDescription, setshowAllDescription] = useState(false);
  const [liked, setLiked] = useState();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const { currentUser } = useAuth();
  const [anchor, setAnchor] = useState(null);
  const [deletePost, setDeletePost] = useState(false);
  const open = Boolean(anchor);
  const postRef = doc(database, "posts", postId);
  const [comments, setComments] = useState(null);

  const handleClose = () => {
    setAnchor(null);
  };
  useEffect(
    () =>
      onSnapshot(postRef, async (snap) => {
        console.log(1);
        setPost(snap.data());
        setLiked(snap.data().likes.includes(currentUser.uid));
        setComments(snap.data().comments);
        setAuthor((await getUserData(snap.data().author)).data());
      }),

    []
  );

  const handleLike = async () => {
    updateDoc(postRef, {
      likes: liked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid),
    });
    setLiked((await getDoc(postRef)).data().likes.includes(currentUser.uid));
  };

  const handleComment = (comment) => {
    updateDoc(postRef, {
      comments: arrayUnion({ author: currentUser.uid, comment }),
    });
  };
  return (
    <>
      <Modal onCloseModal={onCloseModal}>
        <Box width="min-content">
          <Box component={Container} py={2}>
            <Box
              //user detail and options button
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              pb={2}
            >
              <Box
                //user detail and post date
                sx={{ cursor: "pointer" }}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Avatar
                  sx={{ height: 50, width: 50 }}
                  src={author?.userPhoto}
                />
                <Box
                //username and date
                >
                  <Body color="grey.900" m="0" bold>
                    {author?.username}
                  </Body>
                  <Small m={0} color="grey.500"></Small>
                </Box>
              </Box>

              {currentUser.uid == author && (
                <IconBtn
                  //options button'
                  disableRipple
                  onClick={(e) => setAnchor(e.currentTarget)}
                  color="grey.500"
                  activeStyles={{ boxShadow: "none" }}
                  height="fix-content"
                  icon={<MoreVert />}
                />
              )}

              <Box
                component={Menu}
                color="grey.100"
                border={500}
                boxShadow="z16"
                anchorEl={anchor}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Small>Edit Post</Small>
                </MenuItem>
                <Box
                  component={MenuItem}
                  // bgcolor="error.main"
                  onClick={handleClose}
                >
                  <TextBtn
                    hoverStyles={{ backgroundColor: "transparent" }}
                    activeStyles={{ boxShadow: "none" }}
                    disableRipple
                    onClick={() => {
                      console.log(currentUser.uid);
                      handleClose();
                      setDeletePost(true);
                    }}
                    color="error.main"
                  >
                    <Small>Delete Post</Small>
                  </TextBtn>
                </Box>
              </Box>
              {/* Menu end */}
            </Box>
            {post?.description && (
              <Body
                //description
                color="grey.900"
                my={0}
              >
                {showAllDescription
                  ? post.description
                  : post.description.slice(0, 150)}
                {post.description.length >= 150 && (
                  <Body
                    component="span"
                    m={0}
                    sx={{ cursor: "pointer", userSelect: "none" }}
                    color="grey.500"
                    onClick={() => setshowAllDescription((state) => !state)}
                  >
                    {showAllDescription ? " . . . See less" : " . . . See more"}
                  </Body>
                )}
              </Body>
            )}
          </Box>
          {/*container-end*/}
          <Box display="flex" justifyContent="center" border="200">
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                maxWidth: "60vw",
                maxHeight: "60vh",
                minWidth: "200px",
              }}
            >
              <img
                style={{
                  objectFit: "cover",
                  minWidth: "100%",
                  minHeight: "100%",
                  objectPosition: "center",
                }}
                src={post?.link}
                alt=""
              />
            </Box>
          </Box>
          <Box
            width="95%"
            mx="auto"
            mb={1}

            //container
          >
            <Box>
              <Btn
                hoverStyles={{ backgroundColor: "transparent" }}
                activeStyles={{ boxShadow: "none" }}
                onClick={handleLike}
                disableRipple
                color={liked ? "info.main" : "grey.700"}
                endIcon={liked ? <ThumbUpAlt /> : <ThumbUpAltOutlined />}
              >
                {" "}
                <Body color="grey.900" m={0}>
                  {post?.likes.length || null}
                </Body>
              </Btn>
              <IconBtn disableRipple icon={<ForumOutlined />} />
            </Box>
            <CommentSection onComment={(value) => handleComment(value)}>
              {comments?.map((comment) => (
                <Comment
                  key={comments.indexOf(comment)}
                  user={comment.author}
                  comment={comment.comment}
                />
              ))}
            </CommentSection>
          </Box>
        </Box>
      </Modal>
      {deletePost && (
        <Modal
          display="flex"
          color="grey.900"
          flexDirection="column"
          boxShadow="z24"
          gap={2}
          padding={3}
        >
          Are you sure you want to delete the post ?
          <Box display="flex" width="100%" justifyContent="flex-end" gap={2}>
            <TextBtn
              hoverStyles={{ backgroundColor: "transparent" }}
              activeStyles={{ boxShadow: "none" }}
              disableRipple
              onClick={() => setDeletePost(false)}
            >
              Cancel
            </TextBtn>
            <ErrorBtn onClick={onConfirmDelete}>Delete</ErrorBtn>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default PostModal;
