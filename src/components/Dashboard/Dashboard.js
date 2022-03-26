import { Container } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../firebase/AuthContext";
import { database } from "../../firebase/config";
import getUserData from "../../firebase/getUserData";
import { addPosts } from "../../Redux/actionsCreator";
import { Box } from "../basic-components/base-component/Box";
import { isMobile } from "../basic-components/typography/typography";
import PostCard from "./PostCard";

export default function Dashboard() {
  const posts = useSelector((state) => state.posts);
  const [user, setUser] = useState();
  const { currentUser } = useAuth();

  useEffect(async () => {
    const userData = (await getUserData(currentUser.uid)).data();
    setUser(userData);
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = onSnapshot(
      collection(database, "posts"),
      (snapshot) => {
        const docs = snapshot.docs.map((snap) => {
          return { id: snap.id, ...snap.data() };
        });
        const docsData = docs.sort((a, b) => b.createdAt - a.createdAt);
        JSON.stringify(posts) != JSON.stringify(docsData) &&
          dispatch(addPosts(docsData));
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <Box
      component={Container}
      width={isMobile() && "100%"}
      pt={4}
      display="flex"
      flexDirection="column"
      gap={5}
      alignItems="center"
    >
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Box>
  );
}
