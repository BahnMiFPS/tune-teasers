import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PlayerList from "../components/PlayerList";
import SongThemes from "../components/SongThemes";
import { Share } from "@mui/icons-material";
import ChatBox from "../components/ChatBox";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");
function Lobby() {
  const { roomId } = useParams();
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  };

  useEffect(() => {
    socket.emit("join_room", roomId);
  }, []);

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
          <PlayerList />
          <SongThemes />
        </Grid>
        <Grid
          item
          container
          spacing={4}
          justifyContent="space-around"
          alignItems={"center"}
        >
          <ChatBox roomId={roomId} />
          <Button
            type="submit"
            variant="contained"
            color="info"
            startIcon={<Share />}
            onClick={handleShareClick}
          >
            Copy Room Link
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
