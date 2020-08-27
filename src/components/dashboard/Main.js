import React, { Component } from "react";
import ioClient from "socket.io-client";
import axios from "axios";
import { Container } from "@material-ui/core";

import AddPostComponent from "../confessInput/AddPost";
import Confessions from "../confessions/Confessions";

import "../styles/dashboard.css";

// const endPoint = "https://confession-api.herokuapp.com";
const endPoint = "http://localhost:5000";

const io = ioClient(endPoint);

class MainContainer extends Component {
  constructor(props) {
    super(props);
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
      loggedIn: true,
      userId: "",
      route: "",
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    this.updatePostDiv = this.updatePostDiv.bind(this);
    this.getUserId = this.getUserId.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      loggedIn: nextProps.authenticated,
    });
  }

  componentDidMount() {
    console.log(this.props);
    document.title = "Confess :)";
    // this.setState({
    //   loggedIn: this.props.authenticated,
    // });
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
  }

  updatePostDiv = (show) => {
    this.setState({
      loggedIn: show,
    });
    this.props.handleAuth(show);
  };
  getUserId = (id) => {
    this.setState({
      userId: id,
    });
  };
  render() {
    return (
      <>
        <Container maxWidth="md">
          {this.state.loggedIn ? <AddPostComponent /> : null}

          <Confessions />
        </Container>
      </>
    );
  }
}

export default MainContainer;
