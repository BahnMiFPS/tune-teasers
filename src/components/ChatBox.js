import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { io } from "socket.io-client";
import { Send } from "@mui/icons-material";

const socket = io.connect("http://localhost:3001");
function ChatBox({ roomId, messageReceived }) {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", {
      message,
      roomId,
    });
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={12}
      sx={{
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "4px",
        marginBottom: 4,
      }}
    >
      <Typography>{messageReceived}</Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container noValidate autoComplete="off" spacing={1}>
          <Grid item xs={8}>
            <TextField
              placeholder="Say Something"
              variant="standard"
              fullWidth
              value={message}
              onChange={handleInputChange}
              inputProps={{ style: { color: "black" } }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              sx={{ height: "100%" }}
              fullWidth
              startIcon={<Send />}
            >
              SEND
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default ChatBox;
