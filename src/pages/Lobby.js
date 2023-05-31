import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PlayerList from "../components/PlayerList";
import SongThemes from "../components/SongThemes";
import { Share } from "@mui/icons-material";
import ChatBox from "../components/ChatBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import socket from "../app/socket";
function Lobby() {
  const { state } = useLocation();
  const [messageReceived, setMessageReceived] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.origin + `/invite/${roomId}`);

    toast.success("Copied to clipboard");
  };
  const handleStartGame = (roomId) => {
    socket.emit("start_game", parseInt(roomId));
  };
  useEffect(() => {
    // Join room when component mounts
    socket.emit("join_room", { name: state.name, roomId: parseInt(roomId) });

    const handleNewPlayer = (data) => {
      setPlayerList(data.players);
    };

    const handleMessage = (data) => {
      setMessageReceived(data);
    };

    const handleNavigateToPlay = (data) => {
      navigate(`/play/${data}`, {
        replace: true,
      });
    };

    socket.on("new_player_joined", handleNewPlayer);
    socket.on("message_sent", handleMessage);
    socket.on("game_started", handleNavigateToPlay);

    // Cleanup function to be run when component unmounts
    return () => {
      socket.off("new_player_joined", handleNewPlayer);
      socket.off("message_sent", handleMessage);
      socket.off("game_started", handleNavigateToPlay);
    };
  }, [roomId, state.name]);

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
          <Button
            onClick={() => {
              handleStartGame(roomId);
            }}
            type="submit"
            variant="contained"
            color="warning"
          >
            Start Game
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Lobby;
