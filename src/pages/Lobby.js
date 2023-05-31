import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PlayerList from "../components/PlayerList";
import SongThemes from "../components/SongThemes";
import { Share } from "@mui/icons-material";
import ChatBox from "../components/ChatBox";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function Lobby() {
  const { state } = useLocation();
  const [messageReceived, setMessageReceived] = useState("");
  const [playerList, setPlayerList] = useState([]);

  useEffect(() => {
    socket.emit("create_room", {
      name: state.name,
      roomId: state.roomId,
    });
    socket.on("room_owner", (data) => {
      setPlayerList([...playerList, data]);
    });
  }, [socket]);

  const { roomId } = useParams();
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.origin + `/invite/${roomId}`);

    toast.success("Copied to clipboard");
  };

  useEffect(() => {
    socket.emit("join_room", roomId);
    socket.on("user_info", (data) => {});
  }, []);

  useEffect(() => {
    socket.on("message_sent", (data) => {
      setMessageReceived(data);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("event", (data) => {});
  }, [socket]);

  return (
    <Container fixed>
      <Grid
        container
        flexDirection="column"
        justifyContent="space-between"
        height="100vh"
        spacing={4}
      >
        <Grid item>
          <Grid container direction="row" justifyContent="space-between">
            <Grid item>
              <Button type="text" disableRipple>
                BACK
              </Button>
            </Grid>
            <Grid item>
              <Typography variant="h5" color={"white"}>
                CONFIGURE GAME
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: "1.25rem", color: "white" }}>
                Room: {roomId}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          spacing={2}
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <PlayerList playerList={playerList} />
          <SongThemes />
        </Grid>
        <Grid
          item
          container
          spacing={4}
          justifyContent="space-around"
          alignItems={"center"}
        >
          <ChatBox roomId={roomId} messageReceived={messageReceived} />
          <Button
            type="submit"
            variant="contained"
            color="info"
            startIcon={<Share />}
            onClick={handleShareClick}
          >
            Invite Friends
          </Button>
          <Button type="submit" variant="contained" color="warning">
            Start Game
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Lobby;
