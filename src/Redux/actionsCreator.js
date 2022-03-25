import { collection, getDocs } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import { database, storage } from "../firebase/config";
import * as actions from "./actions";

export const addPosts = (posts) => ({
  type: actions.ADD_POSTS,
  payload: {
    posts,
  },
});

export const fetchPosts = () => async (dispatch) => {
  const postsRef = collection(database, "images");
  let res;
  let posts = [];
  try {
    res = await getDocs(postsRef);
    res.forEach((post) => posts.push(post.data()));
    dispatch(addPosts(posts));
  } catch (error) {
    console.log(error);
  }
};
