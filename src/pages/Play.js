import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import QuizQuestions from "../components/QuizQuestions";
import LobbyLeaderboard from "../components/LobbyLeaderboard";
import socket from "../app/socket";
import { useParams } from "react-router-dom";

function Play() {
  const [question, setQuestion] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const { roomId } = useParams();

  useEffect(() => {
    socket.emit("room_game_init", parseInt(roomId));

    socket.on("new_question", (data) => {
      console.log("🚀 ~ file: Play.js:17 ~ socket.on ~ data:", data);

      setQuestion(data);
    });

    socket.on("leaderboard_updated", (data) => {
      setLeaderboard(data);
    });

    // Clean up the event listeners when component unmounts
    return () => {
      socket.off("new_question");
      socket.off("leaderboard_updated");
    };
  }, [roomId]);

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
        <LobbyLeaderboard leaderboard={leaderboard} />
        <QuizQuestions question={question} />

        <Grid item alignSelf={"flex-end"}>
          <Typography color={"grey"}>Copyright </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Play;
