import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createComment, getPost } from "../../actions/posts";

export default function CommentSection({ post }) {
  const [commentData, setCommentData] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const clear = () => {
    setCommentData("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createComment(post._id, {
        message: commentData,
        name: user?.result?.name,
      })
    );
    clear();
  };

  return (
    <div>
      <div>
        <h4>Comment Section</h4>
        {post.comments.map((comment, index) => (
          <div key={index}>
            <p>
              <strong>{comment.name}</strong>: {comment.message}
            </p>
          </div>
        ))}
      </div>
      {user?.result?.name ? (
        <div>
          <h4>Leave a Comment</h4>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Comment"
              value={commentData}
              onChange={(e) => setCommentData(e.target.value)}
            />
            <button>Submit</button>
          </form>
        </div>
      ) : (
        <h4>Please log in to leave a comment</h4>
      )}
    </div>
  );
}
