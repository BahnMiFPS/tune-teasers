import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import { requests } from "../api/requests";
import { useNavigate, useParams } from "react-router-dom";
import PlaylistsRow from "../components/Rows/PlaylistsRow";
import socket from "../app/socket";
import CountdownComponent from "../components/WaitingLobby/CountDownComponent";

function ConfigureRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [chosenCard, setChosenCard] = useState("");
  const [startGameCountdown, setStartGameCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const handleCardClick = (id) => {
    setChosenCard(id);
    console.log(chosenCard, id);
  };

  const handleStartCountdown = () => {
    setStartGameCountdown(true);
    let countdownValue = 3;
    setCountdown(countdownValue);

    const countdownInterval = setInterval(() => {
      countdownValue--;
      setCountdown(countdownValue);

      if (countdownValue === 0) {
        clearInterval(countdownInterval);
        setStartGameCountdown(false);
        socket.emit("start_game", {
          roomId: parseInt(roomId),
        });
      }
    }, 1000);
  };

  const handleStartGame = () => {
    console.log("picked_music_starting_game");
    socket.emit("picked_music_starting_game", {
      roomId: parseInt(roomId),
      playlistId: chosenCard,
    });
  };

  useEffect(() => {
    const handleNavigateToPlay = (data) => {
      navigate(`/play/${data}`, {
        replace: true,
      });
    };

    socket.on("countdown_start", handleStartCountdown);
    socket.on("game_started", handleNavigateToPlay);

    return () => {
      socket.off("game_started", handleNavigateToPlay);
    };
  }, [roomId, handleStartCountdown, navigate]);

  return (
    <Container fixed>
      <Grid
        container
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          height: "100%",
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h5" color="white" textAlign="center">
            Pick your vibe
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {requests.map((category, index) => (
            <PlaylistsRow
              title={category.name}
              url={category.url}
              key={index}
              handleCardClick={handleCardClick}
              chosenCard={chosenCard}
            />
          ))}
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={handleStartGame}
            type="submit"
            disabled={chosenCard === ""}
            variant="contained"
            color="warning"
          >
            Start Game
          </Button>
        </Grid>
      </Grid>
      {startGameCountdown && <CountdownComponent countdown={countdown} />}
    </Container>
  );
}

export default ConfigureRoom;
