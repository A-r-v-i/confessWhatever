import React, { useState, useEffect } from "react";
import {
  Modal,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import {
  FavoriteBorder,
  Favorite,
  QuestionAnswerTwoTone,
  SendRounded,
  HighlightOffRounded,
} from "@material-ui/icons";
import Axios from "axios";

// const endpoint = "https://confession-api.herokuapp.com";
const endpoint = "http://localhost:5000";
const token = localStorage.getItem("token"),
  userId = localStorage.getItem("id");

export default function ConfessionDetail({ item, closeDetail, open }) {
  const [post, setPost] = useState(item);
  const [liked, setLiked] = useState();
  const [totLikes, setTotlikes] = useState(0);
  const [wannaCmnt, setWannaCmnt] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(item.comments);

  const postId = item._id;
  let likesArr = [];
  useEffect(() => {
    setPost(() => item);
    item.likes.forEach((element) => {
      likesArr.push(element._id);
    }, []);
    likesArr.includes(userId) ? setLiked(() => true) : setLiked(() => false);
    setTotlikes(() => likesArr.length);
  }, [item, likesArr, liked]);
  let data = item.createdAt;
  let d = new Date(data);
  let hour = d.getHours() + 1,
    mins = d.getMinutes() + 1,
    date = d.getDate(),
    month = d.getMonth() + 1,
    year = d.getFullYear();

  async function likable(response) {
    console.log(response);
    await Axios.put(
      endpoint + `/api/post/${postId}`,
      {
        postId: item._id,
        userId: userId,
        liked: response,
      },
      {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      }
    ).then((res) => {
      console.log(res.data.message);
    });
  }

  const handleLike = async () => {
    setTotlikes(() => totLikes + 1);
    await likable(true);
  };
  const handleDislike = async () => {
    setTotlikes(() => totLikes - 1);
    await likable(false);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setComment(() => e.target.value);
  };
  const handleComment = (e) => {
    e.preventDefault();
    Axios.post(
      endpoint + `/api/post/${postId}`,
      {
        userId: userId,
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer: ${token}`,
        },
      }
    )
      .then((result) => {
        console.log(result);
        setComments(() => result.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
    setComment(() => "");
  };

  return (
    <Modal
      className="confessionModal"
      open={open}
      onClose={() => closeDetail()}
      closeAfterTransition
    >
      <Card className="confessionDetail" id="refCard">
        <div className="confessionContentSection">
          <CardHeader
            avatar={
              <Avatar>
                {post.userId.name[0]}
                {post.userId.name[1]}
              </Avatar>
            }
            title={post.title}
            action={
              <HighlightOffRounded
                id="closeDetail"
                onClick={() => closeDetail()}
              />
            }
          />
          <CardContent>
            <Typography>{post.content}</Typography>
          </CardContent>
        </div>
        <div className="confessionUtilities">
          <CardContent id="footerContainer">
            {liked ? (
              <Favorite
                onClick={() => {
                  setLiked(() => false);
                  handleDislike();
                }}
                color="secondary"
              />
            ) : (
              <FavoriteBorder
                onClick={() => {
                  setLiked(() => true);
                  handleLike();
                }}
                color="secondary"
              />
            )}
            <QuestionAnswerTwoTone
              onClick={() => {
                setWannaCmnt(() => true);
              }}
              color="action"
            />
            <code id="time">
              {hour}:{mins} - {date}:{month}:{year}
            </code>
          </CardContent>
          {wannaCmnt ? (
            <>
              <CardContent>
                <form className="commentsContainer">
                  <input
                    id="comment"
                    name="comment"
                    onChange={handleChange}
                    value={comment}
                    placeholder="Type a comment"
                  />
                  <button
                    color="secondary"
                    onClick={handleComment}
                    id="cmntBtn"
                  >
                    <SendRounded id="sendIcon" color="primary" />
                  </button>
                </form>
              </CardContent>
              <List>
                {comments.map((cmnt) => {
                  return (
                    <ListItem key={cmnt._id}>
                      <Avatar id="cmntUserAvatar">{cmnt.userId[1]}</Avatar>
                      <ListItemText id="cmntText" primary={cmnt.content} />
                    </ListItem>
                  );
                })}
              </List>
            </>
          ) : null}
        </div>
      </Card>
    </Modal>
  );
}
