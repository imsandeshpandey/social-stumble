import { Avatar } from "@mui/material";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAuth } from "../../firebase/AuthContext";
import { database } from "../../firebase/config";
import getUserData from "../../firebase/getUserData";
import { addPosts } from "../../Redux/actionsCreator";
import { Box } from "../basic-components/base-component/Box";
import Container from "../basic-components/Container";
import { Divider } from "../basic-components/theme/Divider";
import PostsGrid from "./PostsGrid";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  const posts = useSelector((state) => state.posts);
  const [user, setUser] = useState();
  const { username } = useParams();
  console.log(username);

  const dispatch = useDispatch();
  useEffect(async () => {
    const userData = (await getUserData(username)).data();
    setUser(userData);
    const unsub = onSnapshot(
      query(collection(database, "posts"), where("author", "==", username)),
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
  }, [username]);
  console.log(2);
  return (
    <Container>
      {user && (
        <Box>
          <Box
            display="grid"
            gap={[2, 0, 0]}
            gridTemplateColumns="1fr 2fr"
            px={["5%", "10%", "12%"]}
            pt={[2.5, 4, 4]}
          >
            <Box>
              {/* Avatar */}
              <Box
                component={Avatar}
                width={[90, 120, 150]}
                height={[90, 120, 150]}
                border={400}
                boxShadow="z24"
                src={user.userPhoto}
              />
            </Box>
            <ProfileDetails
              name={user.name}
              username={user.username}
              postsCount={posts.length}
            />
          </Box>
          <Divider height="1px" bgcolor="grey.300" mt={3} />
          <PostsGrid posts={posts} />
        </Box>
      )}
    </Container>
  );
};

export default Profile;
