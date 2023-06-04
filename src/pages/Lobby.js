import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Avatar,
  Snackbar,
  CircularProgress,
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
  const [genre, setGenre] = useState("");
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.origin + `/invite/${roomId}`);
    setOpenSnackbar(true);
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
    setIsLoading(true); // Set loading state to true before socket.emit

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
  }, [state.name, roomId]);

  return (
    <>
      {isLoading ? ( // Render CircularProgress while loading state is true
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <CircularProgress color="info" size="3rem" />
          <Typography variant="h5" color="white">
            Initial Handshake
          </Typography>
        </Box>
      ) : (
        <>
          <Grid
            container
            flexDirection="column"
            justifyContent="space-around"
            minHeight="100vh"
            spacing={4}
          >
            <Grid item>
              <Grid container direction="row" justifyContent="space-between">
                {/* <Grid item>
                  <Button type="text" disableRipple>
                    BACK
                  </Button>
                </Grid> */}
                <Grid item>
                  <Typography variant="h5" color="white">
                    Waiting Room
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
              flexDirection="row"
              justifyContent="space-between"
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
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {playerList.map((player, index) => (
                    <Grid item xs={2} sm={4} md={4} key={player.id}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Avatar src={player.image}>
                          {player.name.charAt(0)}
                        </Avatar>
                        <Typography color="white" variant="body1">
                          {player.name}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <ChatBox />
              </Grid>
            </Grid>
            <Grid
              container
              flexDirection="row"
              spacing={4}
              justifyContent="space-around"
              alignItems="center"
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
                  variant="contained"
                  color="warning"
                >
                  Start Game
                </Button>
              </Grid>
            </Grid>
          </Grid>
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
        </>
      )}
    </>
  );
}

export default Lobby;
