import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { requests } from "../api/requests";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PlaylistsRow from "../components/Rows/PlaylistsRow";
import { Share } from "@mui/icons-material";
import socket from "../app/socket";

function ConfigureRoom() {
  const { roomId } = useParams();

  const [chosenCard, setChosenCard] = useState("");
  const navigate = useNavigate();

  // socket.emit("start_game", parseInt(roomId));
  const handleCardClick = (id) => {
    setChosenCard(id);
  };

  console.log(chosenCard);
  const handleStartGame = () => {
    socket.emit("start_game", {
      roomId: parseInt(roomId),
      playlistId: chosenCard,
    });
  };

  useEffect(() => {
    // Join room when component mounts

    const handleNavigateToPlay = (data) => {
      navigate(`/play/${data}`, {
        replace: true,
      });
    };

    socket.on("game_started", handleNavigateToPlay);

    // Cleanup function to be run when component unmounts
    return () => {
      socket.off("game_started", handleNavigateToPlay);
    };
  }, [roomId]);
  return (
    <Container fixed>
      <Typography variant="h5" color="white" textAlign="center">
        Pick your vibe
      </Typography>
      {requests.map((category, index) => {
        return (
          <PlaylistsRow
            title={category.name}
            url={category.url}
            key={index}
            handleCardClick={handleCardClick}
          />
        );
      })}
      <Grid
        marginTop={4}
        container
        flexDirection={"row"}
        justifyContent="space-around"
        alignItems={"center"}
        alignSelf={"center"}
      >
        <Grid item>
          <Button
            onClick={handleStartGame}
            type="submit"
            disabled={chosenCard === null}
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

export default ConfigureRoom;
