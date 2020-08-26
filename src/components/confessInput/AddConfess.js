import React, { useState } from "react";
import { Modal, Card, CardHeader, CardContent } from "@material-ui/core";
import { HighlightOffRounded } from "@material-ui/icons";
import Axios from "axios";

const endpoint = "http://localhost:5000";

export default function AddConfess({ open, close }) {
  console.log(open);
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
    <div className="confessModal">
      <header id="confessModalHeader">
        <p>Write yourc confession</p>
        <HighlightOffRounded id="closeDetail" onClick={close()} />
      </header>
      <article id="confessModalContainer">
        <input
          id="inputTitle"
          placeholder="Enter title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          id="inputTextArea"
          rows="5"
          cols="70"
          placeholder="Enter your content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          id="inputBtn"
          onClick={() => {
            console.log(title, content);
          }}
        >
          Post
        </button>
      </article>
    </div>
  );
}
