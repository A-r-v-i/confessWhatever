import React, { useState } from "react";
import Axios from "axios";
const endpoint = "http://localhost:5000";
export default function AddPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addPost = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    Axios.post(
      `${endpoint}/api/post`,
      {
        title: title,
        content: content,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setContent("");
    setTitle("");
  };
  return (
    <div>
      <input
        placeholder="Enter title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <textarea
        rows="5"
        cols="70"
        placeholder="Enter your content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={addPost}>Post</button>
    </div>
  );
}
