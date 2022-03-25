// import { getDocs } from "firebase/firestore";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { database } from "./config";

// const useDatabase = () => {
//   const [post, setPost] = useState(null);
//   const [postId, setPostId] = useState(null);
//   const dispatch = useDispatch();

//   const addPost = (post) => {
//     setPost(post);
//   };

//   const getPost = (postid) => {
//     setPostId(postId);
//   };

//   const getPosts = () => {};

//   const postsRef = collection(database, collection);
//   useEffect(async () => {
//     const posts = await getDocs(postsRef);
//     posts.forEach((post) => {
//         dispatch(addPosts)
//     });
//   }, [third]);
// };
