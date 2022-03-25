import * as actions from "./actions";
const initialState = {
  posts: [],
};

export default function reducer(state = initialState, action) {
  return action?.type === actions.ADD_POSTS
    ? { posts: [...action.payload.posts] }
    : state;
}
