import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import QuizQuestions from "../components/QuizQuestions";
import socket from "../app/socket";
import { useNavigate, useParams } from "react-router-dom";
import { DoorBack } from "@mui/icons-material";
import LobbyLeaderboard from "../components/WaitingLobby/LobbyLeaderboard";
import VolumeSlider from "../components/PlayLobby/VolumeSlider";
import ChatBox from "../components/ChatBox/ChatBox";

function Play() {
  const [question, setQuestion] = useState(null);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const newQuestion = (data) => {
      setQuestion(data);
    };

    const updateLeaderboard = (data) => {
      setLeaderboard(data);
    };

    const correctAnswerChosen = (data) => {
      setLeaderboard(data);
    };

    const gameEnded = () => {
      setIsGameEnded(true);
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
    socket.emit("leave_room", parseInt(roomId));
    navigate("/", { replace: true });
  };

  return (
    <Container fixed sx={{}}>
      <Grid
        container
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item>
              <img src="/logo.svg" alt="Logo" style={{ maxWidth: "30px" }} />
            </Grid>

            <Grid item>
              <IconButton
                color="warning"
                onClick={() => {
                  handleQuit(roomId);
                }}
              >
                <DoorBack />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Grid
              container
              direction={isSmallScreen ? "column" : "row"}
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                <LobbyLeaderboard leaderboard={leaderboard} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ChatBox />
              </Grid>
            </Grid>
            <Grid item>
              {!isGameEnded && <QuizQuestions question={question} />}
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <VolumeSlider question={question} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Play;
