import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PlayerList from "../components/PlayerList";
import SongThemes from "../components/SongThemes";
import { Share } from "@mui/icons-material";
import ChatBox from "../components/ChatBox/ChatBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import socket from "../app/socket";
import Chat from "../components/ChatBox/ChatBox";
function Lobby() {
  const { state } = useLocation();
  const [messageSent, setMessageSent] = useState("");
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

    const handleCreateRoomInstead = ({ roomId }) => {
      console.log("no room");
      toast.error(`Lobby ${roomId} not found or is busy`);
      navigate(`/`);
    };

    socket.on("no_room_found", handleCreateRoomInstead);
    socket.on("new_player_joined", handleNewPlayer);
    socket.on("message_sent", handleMessage);
    socket.on("game_started", handleNavigateToPlay);

    // Cleanup function to be run when component unmounts
    return () => {
      socket.off("no_room_found", handleCreateRoomInstead);
      socket.off("new_player_joined", handleNewPlayer);
      socket.off("message_sent", handleMessage);
      socket.off("game_started", handleNavigateToPlay);
    };
  }, []);

  return (
    <Container fixed>
      <Grid
        container
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
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
          <Chat />
        </Grid>
        <Grid
          container
          flexDirection={"row"}
          spacing={4}
          justifyContent="space-around"
          alignItems={"center"}
          alignSelf={"center"}
        >
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="info"
              startIcon={<Share />}
              onClick={handleShareClick}
            >
              Invite Friends
            </Button>
          </Grid>
          <Grid item>
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
      </Grid>
    </Container>
  );
}

export default Lobby;
