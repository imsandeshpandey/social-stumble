import {
  ForumOutlined,
  MoreVert,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { Avatar, Container, Menu, MenuItem, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Btn } from "../basic-components/button/ButtonBase";
import {
  ErrorBtn,
  IconBtn,
  TextBtn,
} from "../basic-components/button/ButtonVariants";

import { Body, Small } from "../basic-components/typography/typography";
import { Box } from "../basic-components/base-component/Box";
import getUserData from "../../firebase/getUserData";
import { Navigate, useNavigate } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  getDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebase/config";
import { useAuth } from "../../firebase/AuthContext";
import Modal from "../basic-components/Modal/Modal";
import CommentSection, { Comment } from "../Profile/PostModal/CommentSection";

const PostCard = ({ post }) => {
  const [showAllDescription, setshowAllDescription] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [deletePost, setDeletePost] = useState(false);
  const open = Boolean(anchor);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [liked, setLiked] = useState(null);
  const [author, setAuthor] = useState();
  const postRef = doc(database, "posts", post.id);
  const [comments, setComments] = useState(null);

  useEffect(async () => {
    setLiked(false);
    const user = (await getUserData(post.author)).data();
    setAuthor(user);
    const postLikes = (await getDoc(postRef)).data().likes;
    const postComments = (await getDoc(postRef)).data().comments;
    postComments && setComments(postComments);
    postLikes && setLiked(postLikes.includes(currentUser.uid));
  }, [post]);

  const handleClose = () => {
    setAnchor(null);
  };
  const handleDelete = () => {
    setDeletePost(false);
    deleteDoc(postRef);
    updateDoc(doc(database, "users", currentUser.uid), {
      posts: arrayRemove(post.id),
    });
  };
  const handleLike = async () => {
    updateDoc(postRef, {
      likes: liked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid),
    });
    setLiked((await getDoc(postRef)).data().likes.includes(currentUser.uid));
  };

  const handleComment = async (comment) => {
    updateDoc(postRef, {
      comments: arrayUnion({ author: currentUser.uid, comment }),
    });
  };

  return post ? (
    <Box
      width={[300, 500, 600]}
      boxShadow="z8"
      bgcolor="grey.200"
      borderRadius="4px"
    >
      <Box component={Container} py={2}>
        <Box
          //user detail and options button
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={2}
        >
          <Box
            onClick={() => navigate(`/${post.author}`)}
            //user detail and post date
            sx={{ cursor: "pointer" }}
            display="flex"
            alignItems="center"
            gap={1}
          >
            <Avatar
              sx={{ height: 50, width: 50 }}
              src="https://cdn.britannica.com/47/188747-050-1D34E743/Bill-Gates-2011.jpg"
            />
            <Box
            //username and date
            >
              <Body color="grey.900" m="0" bold>
                {author?.username}
              </Body>
              <Small m={0} color="grey.500">
                {/* {post.createdAt.toDate()} */}
              </Small>
            </Box>
          </Box>

          {post.author === currentUser.uid && (
            <IconBtn
              //options button
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
          {deletePost && (
            <Modal
              display="flex"
              color="grey.900"
              flexDirection="column"
              gap={2}
              padding={3}
            >
              Are you sure you want to delete the post ?
              <Box
                display="flex"
                width="100%"
                justifyContent="flex-end"
                gap={2}
              >
                <TextBtn
                  hoverStyles={{ backgroundColor: "transparent" }}
                  activeStyles={{ boxShadow: "none" }}
                  disableRipple
                  onClick={() => setDeletePost(false)}
                >
                  Cancel
                </TextBtn>
                <ErrorBtn onClick={handleDelete}>Delete</ErrorBtn>
              </Box>
            </Modal>
          )}
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
            // maxWidth: "60vw",
            // maxHeight: "60vh",
            // minWidth: "200px",
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
            <Body color="grey.900" m={0}>
              {post.likes.length || null}
            </Body>
          </Btn>
          <IconBtn disableRipple icon={<ForumOutlined />} />
        </Box>
        <CommentSection onComment={(value) => handleComment(value)}>
          {comments?.map(({ author, comment }) => (
            <Comment key={Timestamp.now()} userId={author} comment={comment} />
          ))}
        </CommentSection>
      </Box>
    </Box>
  ) : null;
};

export default PostCard;
