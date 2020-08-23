import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Typography,
} from "@material-ui/core";
import "./styles/confessions.css";
export default function ConfessionDetail({ item, closeDetail }) {
  // console.log(item.createdAt);
  let data = item.createdAt;
  let d = new Date(data);
  let hour = d.getHours() + 1,
    mins = d.getMinutes() + 1,
    date = d.getDate(),
    month = d.getMonth() + 1,
    year = d.getFullYear();
  return (
    <Card className="confessionDetail">
      <CardHeader
        avatar={<Avatar>{item.userId.name[0]}</Avatar>}
        title={item.title}
        action={
          <span id="closeDetail" onClick={() => closeDetail()}>
            x
          </span>
        }
      />
      <CardContent>
        <Typography>{item.content}</Typography>
      </CardContent>
      <CardContent id="timeContainer">
        <code id="time">
          {hour}:{mins} - {date}:{month}:{year}
        </code>
      </CardContent>
    </Card>
  );
}
