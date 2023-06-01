import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Paper } from "@mui/material";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Messages.js";
import theme from "../../theme/theme.js";
import socket from "../../app/socket.js";
import { useParams } from "react-router-dom";

const StyledPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    height: "50vh",
    minWidth: "300px",
    maxHeight: "500px",
    width: "50vw",
  },
  [theme.breakpoints.up("md")]: {
    width: "50vw",
    height: "70vh",
    minWidth: "300px",
    maxWidth: "500px",

    maxHeight: "700px",
  },
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  position: "relative",
}));

const MessagesBody = styled("div")({
  width: "calc(100% - 20px)",
  margin: 10,
  overflowY: "scroll",
  height: "calc(100% - 80px)",
});

export default function Chat() {
  const { roomId } = useParams();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    socket.emit("send_message", {
      message,
      roomId: parseInt(roomId),
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };

  useEffect(() => {
    socket.on("message_sent", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("message_sent");
    };
  }, []);

  return (
    <Grid item sx={{ backgroundColor: "none" }}>
      <StyledPaper elevation={2}>
        <MessagesBody>
          {messages.map((msg, index) =>
            msg.sender === socket.id ? (
              <MessageRight
                key={index}
                message={msg.message}
                photoURL={msg.photoURL}
                displayName={msg.displayName}
                avatarDisp={true}
              />
            ) : (
              <MessageLeft
                key={index}
                message={msg.message}
                photoURL={msg.photoURL}
                displayName={msg.displayName}
                avatarDisp={false}
              />
            )
          )}
        </MessagesBody>
        <TextInput
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          message={message}
        />
      </StyledPaper>
    </Grid>
  );
}
