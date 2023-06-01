import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@mui/material";
import QuizQuestions from "../components/QuizQuestions";
import LobbyLeaderboard from "../components/LobbyLeaderboard";
import socket from "../app/socket";
import { useNavigate, useParams } from "react-router-dom";
import { replace } from "formik";
import { DoorBack } from "@mui/icons-material";

function Play() {
  const [question, setQuestion] = useState(null);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const { roomId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const newQuestion = (data) => {
      setQuestion(data);
    };

    const updateLeaderboard = (data) => {
      console.log();
      setLeaderboard(data);
    };

    const correctAnswerChosen = (data) => {
      setLeaderboard(data);
    };

    const gameEnded = () => {
      setIsGameEnded(true);
      console.log("game ending", isGameEnded);
    };

    socket.emit("room_game_init", parseInt(roomId));
    socket.on("new_question", newQuestion);
    socket.on("leaderboard_updated", updateLeaderboard);
    socket.on("correct_answer", correctAnswerChosen);
    socket.on("game_ended", gameEnded);

    // Clean up the event listeners when component unmounts
    return () => {
      socket.off("room_game_init");
      socket.off("new_question", newQuestion);
      socket.off("leaderboard_updated", updateLeaderboard);
      socket.off("correct_answer", correctAnswerChosen);
      socket.off("game_ended", gameEnded);
    };
  }, []);

  const handleQuit = (roomId) => {
    // Add your logic for quitting the game or leaving the room
    // For example, you can navigate the user back to the lobby or home page
    socket.emit("leave_room", parseInt(roomId));
    navigate("/", { replace: true });
  };
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
              <Button
                size="large"
                type="submit"
                variant="contained"
                color="warning"
                startIcon={<DoorBack />}
                onClick={() => {
                  handleQuit(roomId);
                }}
              >
                Quit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid item justifySelf={"flex-start"}>
            <LobbyLeaderboard leaderboard={leaderboard} />
          </Grid>

          {!isGameEnded ? <QuizQuestions question={question} /> : ""}
        </Grid>

        <Grid item alignSelf={"flex-end"}>
          <Typography color={"grey"}>Copyright </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Play;
