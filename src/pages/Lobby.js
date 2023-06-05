import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Snackbar,
  CircularProgress,
  Paper,
  AvatarGroup,
  Stack,
  Container,
  Slider,
  ToggleButtonGroup,
  ToggleButton,
  Grid,
} from "@mui/material";
import { Share } from "@mui/icons-material";
import ChatBox from "../components/ChatBox/ChatBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import socket from "../app/socket";

function Lobby() {
  const { state } = useLocation();
  const [messageReceived, setMessageReceived] = useState("");
  const [playerList, setPlayerList] = useState([]);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [songNumbers, setSongNumbers] = useState(5);
  const [gameMode, setGameMode] = useState("Normal");
  const gameModes = ["Slow", "Normal", "Fast"];

  const checkIsOwner = (playerList, socketId) => {
    if (playerList.length > 0) {
      const thisPlayer = playerList.find((player) => player.id === socketId);
      return thisPlayer.owner;
    } else return false;
  };
  const handleChange = (event, newGameMode) => {
    setGameMode(newGameMode);
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.origin + `/invite/${roomId}`);
    setOpenSnackbar(true);
  };

  const handleStartPickingMusic = () => {
    socket.emit("pick_music", {
      roomId: parseInt(roomId),
      gameMode,
      songNumbers,
    });
  };

  const handleNavigateToConfigureRoom = ({ roomId, playerList }) => {
    const isThisOwner = checkIsOwner(playerList, socket.id);
    navigate(`/configure/${roomId}`, {
      replace: true,
      state: isThisOwner,
    });
  };

  useEffect(() => {
    setIsLoading(true);

    socket.emit("join_room", { name: state.name, roomId: parseInt(roomId) });

    const handleNewPlayer = (data) => {
      try {
        if (!data) {
          setIsLoading(true);
        } else {
          setPlayerList(data.players);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    const handleMessage = (data) => {
      setMessageReceived(data);
    };

    const handleCreateRoomInstead = ({ roomId }) => {
      console.log("no room");
      setOpenSnackbar(true);
      navigate(`/`);
    };

    socket.on("start_choosing_music", handleNavigateToConfigureRoom);
    socket.on("no_room_found", handleCreateRoomInstead);
    socket.on("new_player_joined", handleNewPlayer);
    socket.on("message_sent", handleMessage);

    return () => {
      socket.off("start_choosing_music", handleNavigateToConfigureRoom);
      socket.off("no_room_found", handleCreateRoomInstead);
      socket.off("message_sent", handleMessage);
    };
  }, [state.name, roomId, navigate]);
  console.log(playerList);

  return (
    <Container fixed>
      <Stack
        spacing={2}
        sx={{ height: "100vh" }}
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? (
          <Stack
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress color="info" size="3rem" />
            <Typography variant="h5" color="white">
              Initial Handshake
            </Typography>
          </Stack>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={6}>
              <Stack spacing={3}>
                <Paper elevation={3}>
                  <Stack spacing={3} p={3} alignItems="flex-start">
                    <Typography variant="subtitle1">
                      Game is more fun with friends
                    </Typography>
                    <Typography variant="body2">
                      Invite your friends to join you in this music quiz!
                    </Typography>
                    <AvatarGroup>
                      {playerList.map((player, index) => (
                        <Avatar key={player.id} src={player.image} sizes="40" />
                      ))}
                    </AvatarGroup>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      color="info"
                      startIcon={<Share />}
                      onClick={handleShareClick}
                      sx={{ alignSelf: "center" }}
                    >
                      Invite Friends
                    </Button>
                  </Stack>
                </Paper>
                <Paper elevation={3}>
                  <Stack spacing={3} p={3}>
                    <Stack
                      spacing={2}
                      direction="row"
                      justifyContent="space-between"
                      width="100%"
                    >
                      <Typography variant="subtitle1">Game Duration</Typography>
                      <Typography variant="subtitle2">
                        {songNumbers} songs
                      </Typography>
                    </Stack>
                    <Box width="100%">
                      <Slider
                        defaultValue={songNumbers}
                        color="info"
                        aria-label="Default"
                        step={1}
                        min={5}
                        max={15}
                        onChange={(e, newValue) => {
                          setSongNumbers(newValue);
                        }}
                        disabled={!checkIsOwner(playerList, socket.id)}
                      />
                    </Box>
                    <Typography variant="subtitle1">
                      Question Duration
                    </Typography>
                    <ToggleButtonGroup
                      color="info"
                      value={gameMode}
                      exclusive
                      onChange={handleChange}
                      fullWidth
                      disabled={!checkIsOwner(playerList, socket.id)}
                    >
                      {gameModes.map((mode, index) => (
                        <ToggleButton key={index} value={mode}>
                          {mode}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                    <Box sx={{ width: "100%", textAlign: "center" }}>
                      <Button
                        onClick={() => {
                          handleStartPickingMusic();
                        }}
                        type="submit"
                        variant="contained"
                        color="warning"
                        disabled={!checkIsOwner(playerList, socket.id)}
                      >
                        Start Game
                      </Button>
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>
            <Grid
              item
              xs={6}
              container
              justifyContent="center"
              alignItems="stretch"
            >
              <ChatBox />
            </Grid>
          </Grid>
        )}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Copied to clipboard
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  );
}

export default Lobby;
