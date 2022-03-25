import React, { useEffect, useState } from "react";
import * as firestore from "firebase/firestore";
import { Box } from "../basic-components/base-component/Box";
import PostModal from "./PostModal/PostModal";
import { useTheme } from "@mui/material";
import {
  arrayRemove,
  deleteDoc,
  doc,
  doc as document,
  updateDoc,
} from "firebase/firestore";
import { database } from "../../firebase/config";
import { useAuth } from "../../firebase/AuthContext";

const PostsGrid = ({ posts, ...rest }) => {
  const theme = useTheme();
  const [selectedPostId, setSelectedPostId] = useState(null);
  console.log(selectedPostId);
  const { currentUser } = useAuth();

  const onConfirmDelete = () => {
    const postToDelete = selectedPostId;
    setSelectedPostId(null);
    deleteDoc(document(database, "posts", postToDelete));
    updateDoc(doc(database, "users", currentUser.uid), {
      posts: arrayRemove(selectedPostId),
    });
  };

  return (
    <Box
      width="100%"
      display="grid"
      mt={4}
      gap="3px"
      gridTemplateColumns="repeat(3,1fr)"
      gridTemplateRows="1fr"
      height={Window.offsetTop}
      {...rest}
    >
      {selectedPostId && (
        <PostModal
          onConfirmDelete={onConfirmDelete}
          postId={selectedPostId}
          onCloseModal={() => setSelectedPostId(null)}
        />
      )}
      {posts?.map((post) => (
        <Box
          key={post.id}
          onClick={() => setSelectedPostId(post.id)}
          sx={{ aspectRatio: "3 / 4", cursor: "pointer" }}
        >
          <Box
            component="img"
            sx={{
              width: "100%",
              aspectRatio: "3/4",
              objectFit: "cover",
            }}
            src={post.link}
            alt={post.caption}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PostsGrid;
