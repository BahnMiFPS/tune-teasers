import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import PlayerList from "../components/PlayerList";
import SongThemes from "../components/SongThemes";
import { Leaderboard, Quiz, Share } from "@mui/icons-material";
import QuizQuestions from "../components/QuizQuestions";
import LobbyLeaderboard from "../components/LobbyLeaderboard";
import ChatBox from "../components/ChatBox";
function Play() {
  return (
    <Container>
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
              <img src="/logo.svg" alt="Logo" style={{ maxWidth: "30px" }} />
            </Grid>
            <Grid item>
              <Typography variant="h5" color={"white"}>
                Progress Bar
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5" color={"white"}>
                Quit
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <LobbyLeaderboard />
        <QuizQuestions />

        <Grid item alignSelf={"flex-end"}>
          <Typography color={"grey"}>Copyright </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Play;
