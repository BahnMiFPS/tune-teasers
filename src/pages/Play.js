import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import QuizQuestions from "../components/QuizQuestions";
import socket from "../app/socket";
import { useNavigate, useParams } from "react-router-dom";
import { replace } from "formik";
import { DoorBack } from "@mui/icons-material";
import useSound from "use-sound";
import LinearWithValueLabel from "../components/Genres/LinearWithValueLabel";
import LobbyLeaderboard from "../components/WaitingLobby/LobbyLeaderboard";

function Play() {
  const [question, setQuestion] = useState(null);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const { roomId } = useParams();
  const [progress, setProgress] = useState(10);
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
    <Container fixed>
      <Grid
        container
        flexDirection="column"
        justifyContent="space-between"
        height="100vh"
        spacing={4}
      >
        <Grid item width="100%">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems={"center"}
            width="100%"
          >
            <Grid item>
              <img src="/logo.svg" alt="Logo" style={{ maxWidth: "30px" }} />
            </Grid>
            <Grid item justifySelf={"center"} xs={6}>
              <LinearWithValueLabel
                progress={progress}
                setProgress={setProgress}
              />
            </Grid>
            <Grid item>
              <Button
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
          <Grid item>
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
