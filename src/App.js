import React, { Component } from "react";
import ioClient from "socket.io-client";
import axios from "axios";
import { Container } from "@material-ui/core";

import "./App.css";
import CheckComponent from "./components/CheckComponents";
import LoginComponent from "./components/auth/Login";
import AddPostComponent from "./components/AddPost";
import Confessions from "./components/confessions/Confessions";

const endPoint = "http://localhost:5000";

const io = ioClient(endPoint);

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      events: ["sample"],
      event: "",
      file: "",
      url: "",
      replyMsgs: [],
      myReply: "",
      number: 0,
      userReply: "",
      user: "",
      welcomeMsg: "",
      token: "",
      loggedIn: false,
      userId: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    document.title = "Bro";
    let expirationTime = localStorage.getItem("time");
    if (new Date() > new Date(expirationTime)) {
      console.log("expired");
      localStorage.clear();
      this.setState({
        loggedIn: false,
      });
    } else {
      console.log("live");
      const token = localStorage.getItem("token");
      if (token) {
        this.setState({
          token: token,
          loggedIn: true,
        });
      }
    }
    io.on("welcome", (data) => {
      console.log(io.id);
      this.setState({
        replyMsgs: [...this.state.replyMsgs, data],
      });
    });
    io.on("dataFromApi", (data) => {
      this.setState({
        events: data,
      });
    });
    io.on("reply", (data) => {
      this.setState({
        replyMsgs: [...this.state.replyMsgs, data],
      });
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    io.emit("toApi", this.state.event);
  };
  uploadFile = (e) => {
    e.preventDefault();
    const image = new FormData();
    if (this.state.file) {
      image.append("image", this.state.file);
    }
    axios.post(endPoint + "/api/add-file", image).then((res) => {
      console.log(res.data.imgUrl);
      this.setState({
        url: res.data.imgUrl,
      });
    });
  };

  handleFileChange = (e) => {
    e.preventDefault();
    this.setState({
      file: e.target.files[0],
    });
  };
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      event: e.target.value,
    });
  };

  //msg board handler
  handleReplyChange = (e) => {
    e.preventDefault();
    this.setState({
      myReply: e.target.value,
    });
  };
  handleMsgSubmit = (e) => {
    e.preventDefault();
    if (this.state.myReply !== "") {
      io.emit("broadcast-to-all", this.state.myReply);
      this.setState({ myReply: "" });
    }
    let msgList = document.getElementsByClassName("msgBoard");
    msgList.scrollTop = msgList.scrollHeight = msgList.clientHeight;
  };

  updateNum = (num) => {
    this.setState({
      number: num,
    });
  };

  updatePostDiv = (show) => {
    this.setState({
      loggedIn: show,
    });
  };
  getUserId = (id) => {
    // console.log(id);
    this.setState({
      userId: id,
    });
  };
  render() {
    // let replyMsgContainer = this.state.replyMsgs.map((msg) => {
    //   return <li key={msg}>{msg}</li>;
    // });
    return (
      <>
        <Container maxWidth="md">
          <input type="text" onChange={this.handleChange} />
          <button onClick={this.handleClick}>Click</button>
          <input
            type="file"
            placeholder="upload file"
            onChange={this.handleFileChange}
          />
          <button onClick={this.uploadFile}>Upload</button>
          {this.state.events.map((event) => {
            return <li key={event}>{event}</li>;
          })}
          {this.state.url ? <img src={this.state.url} alt="img" /> : null}
          {/* msg block container */}
          <div>
            <input
              type="number"
              value={this.state.number}
              readOnly
              // onChange={this.updateNum}
            />
          </div>
          <CheckComponent
            number={this.state.number}
            updateNum={this.updateNum}
          />
          {this.state.loggedIn ? (
            <AddPostComponent />
          ) : (
            <LoginComponent
              updatePostDiv={this.updatePostDiv}
              getUserId={this.getUserId}
            />
          )}

          {/* Confession component  */}
          <Confessions />

          {/* <div className="msgWrapper">
            <div className="msgBoard">
              <ul>{replyMsgContainer}</ul>
            </div>
            <div className="inputContainer">
              <form onSubmit={this.handleMsgSubmit}>
                <input
                  type="text"
                  value={this.state.lastReplyMsg}
                  onChange={this.handleReplyChange}
                />
                <button className="sendBtn"> S </button>
              </form>
            </div>
          </div> */}
        </Container>
      </>
    );
  }
}

export default App;
