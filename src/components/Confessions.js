import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Grid, Paper, Typography, CircularProgress } from "@material-ui/core";
import ConfessionDetail from "./ConfessionDetail";
import "./styles/confessions.css";

const endPoint = "http://localhost:5000",
  token = localStorage.getItem("token");

export default function Confessions() {
  const [loaded, setLoaded] = useState(false);
  const [confessions, setConfessions] = useState([]);
  const [item, setItem] = useState({});
  const [detailedView, setDetailedView] = useState(false);

  useEffect(() => {
    Axios.get(endPoint + "/api/posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((posts) => {
      // console.log(posts)
      let _items = posts.data.confessions;
      setLoaded(true);
      setConfessions((c) => [...c, ..._items]);
    });
  }, []);

  const openConfession = (_item) => {
    setItem(_item);
    setDetailedView(true);
  };

  const closeDetail = () => {
    setDetailedView(false);
  };

  return (
    <div className="confessionWrapper">
      {loaded ? null : <CircularProgress className="progress" size={100} thickness={5} color="secondary" />}
      <Grid container className="confession_list">
        {confessions.map((item) => {
          return (
            <Grid
              className="confession_list-item"
              item
              xs={12}
              key={item._id}
              onClick={() => openConfession(item)}
            >
              <Paper className="confession_item-container">
                <Typography>{item.title}</Typography>
                <Typography>-{item.userId.name}</Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {detailedView ? (
        <ConfessionDetail item={item} closeDetail={closeDetail} />
      ) : (
        <div className="confessionDetail">
          Choose a confession to know more about it
        </div>
      )}
    </div>
  );
}
