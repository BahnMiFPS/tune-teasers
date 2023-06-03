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

  const handleCardClick = (id) => {
    setChosenCard(id);
  };

  const handleStartGame = () => {
    socket.emit("start_game", {
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

    socket.on("game_started", handleNavigateToPlay);

    return () => {
      socket.off("game_started", handleNavigateToPlay);
    };
  }, [roomId]);

  return (
    <Container
      fixed
      sx={{
        height: "100%",
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography variant="h5" color="white" textAlign="center">
            Pick your vibe
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
    </Container>
  );
}

export default ConfigureRoom;
