import React, { Component } from "react";
import { IconButton, TextareaAutosize, Button } from "@material-ui/core";
import { AddCircleOutlineRounded } from "@material-ui/icons";
import Axios from "axios";
import "../styles/addpost.css";

const endpoint = "http://localhost:5000";

class AddPost extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      title: "",
      content: "",
    };
    this.handleModal = this.handleModal.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleModal = () => {
    this.setState({
      open: !this.state.open,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.title !== "" && this.state.content !== "") {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      Axios.post(
        `${endpoint}/api/post`,
        {
          title: this.state.title,
          content: this.state.content,
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
          if (res.status === 200) {
            this.setState({
              title: "",
              content: "",
            });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  render() {
    return (
      <div className="newConfession">
        {this.state.open ? (
          <div className="confessInput">
            <p>Confess here.......</p>
            <input
              id="title"
              value={this.state.title}
              placeholder="enter title"
              onChange={this.handleChange}
              name="title"
            />
            <TextareaAutosize
              id="textarea"
              rowsMin={3}
              value={this.state.content}
              placeholder="enter confession"
              onChange={this.handleChange}
              name="content"
            />
            <span className="addBtn">
              <Button
                id="confessBtn"
                variant="outlined"
                color="secondary"
                onClick={this.handleSubmit}
              >
                Confess
              </Button>
            </span>
          </div>
        ) : (
          <IconButton id="newBtn" onClick={this.handleModal}>
            <AddCircleOutlineRounded />
            Add new
          </IconButton>
        )}
      </div>
    );
  }
}

export default AddPost;
