import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_ONE,
  COMMENT,
} from "../constants/actionTypes";

const reducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return { ...state, posts: action.payload };
    case FETCH_ONE:
      return { ...state, post: action.payload };
    case CREATE:
      return { ...state, posts: [state.posts, action.payload] };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        post: action.payload,
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
