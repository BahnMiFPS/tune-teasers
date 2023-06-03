import { Box, Button, Card, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SongThemes from "../components/SongThemes";
import { Share } from "@mui/icons-material";
import ChatBox from "../components/ChatBox/ChatBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import socket from "../app/socket";
import Chat from "../components/ChatBox/ChatBox";
import Genre from "../components/Genres/Genre";
import PlayerList from "../components/WaitingLobby/PlayerList";
function Lobby() {
  const { state } = useLocation();
  const [messageSent, setMessageSent] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const [genre, setGenre] = useState("");

  const { roomId } = useParams();
  const navigate = useNavigate();
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.origin + `/invite/${roomId}`);

    toast.success("Copied to clipboard");
  };
  const handleStartPickingMusic = (roomId) => {
    socket.emit("pick_music", parseInt(roomId));
  };
  const handleNavigateToConfigureRoom = (roomId) => {
    navigate(`/configure/${roomId}`, {
      replace: true,
    });
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

    const handleCreateRoomInstead = ({ roomId }) => {
      console.log("no room");
      toast.error(`Lobby ${roomId} not found or is busy`);
      navigate(`/`);
    };
    socket.on("start_choosing_music", handleNavigateToConfigureRoom);
    socket.on("no_room_found", handleCreateRoomInstead);
    socket.on("new_player_joined", handleNewPlayer);
    socket.on("message_sent", handleMessage);

    // Cleanup function to be run when component unmounts
    return () => {
      socket.off("start_choosing_music", handleNavigateToConfigureRoom);
      socket.off("no_room_found", handleCreateRoomInstead);
      socket.off("message_sent", handleMessage);
    };
  }, [state.name, roomId]);

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
          spacing={2}
          container
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{}}
        >
          <Grid
            xs={6}
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Grid item xs={4}>
              <PlayerList playerList={playerList} />
            </Grid>
            {/* <Grid item xs={8}>
              <Genre />
            </Grid> */}
          </Grid>
          <Grid item xs={6} sx={{}}>
            <Chat />
          </Grid>
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
                handleStartPickingMusic(roomId);
              }}
              type="submit"
              // disabled={
              //   playerList.length <= 1 || playerList[0].id !== socket.id
              // }
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
