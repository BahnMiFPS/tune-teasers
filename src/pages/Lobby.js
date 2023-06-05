import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
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

  const handleNavigateToConfigureRoom = (roomId) => {
    navigate(`/configure/${roomId}`, {
      replace: true,
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

  return (
    <Container>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
            minHeight: "100vh",
          }}
        >
          <CircularProgress color="info" size="3rem" />
          <Typography variant="h5" color="white">
            Initial Handshake
          </Typography>
        </Box>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item xs={6}>
            <Grid item xs={12} mb={3}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 3,
                  alignItems: "flex-start",
                  gap: 3,
                }}
              >
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
                  color="info"
                  startIcon={<Share />}
                  onClick={handleShareClick}
                  sx={{ alignSelf: "center" }}
                >
                  Invite Friends
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 3,
                  alignItems: "flex-start",
                  gap: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1">Game Duration</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">
                      {songNumbers} songs
                    </Typography>
                  </Box>
                </Box>
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
                  />
                </Box>
                <Typography variant="subtitle1">Question Duration</Typography>
                <ToggleButtonGroup
                  color="info"
                  value={gameMode}
                  exclusive
                  onChange={handleChange}
                  fullWidth
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
                      handleStartPickingMusic(roomId);
                    }}
                    type="submit"
                    variant="contained"
                    color="warning"
                  >
                    Start Game
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>

          <ChatBox />
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
    </Container>
  );
}

export default Lobby;
