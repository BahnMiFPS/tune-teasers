import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
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
import theme from "../theme/theme";

function Play() {
  const [question, setQuestion] = useState(null);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const { roomId } = useParams();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [rightAnswerIs, setRightAnswerIs] = useState("");
  const [countDownTimer, setCountDownTimer] = useState(null);

  useEffect(() => {
    const newQuestion = (data) => {
      setQuestion(data);
    };

    const updateLeaderboard = (data) => {
      setLeaderboard(data);
    };

    const gameEnded = () => {
      setIsGameEnded(true);
    };

    socket.emit("room_game_init", parseInt(roomId));
    socket.on("new_question", newQuestion);
    socket.on("leaderboard_updated", updateLeaderboard);
    socket.on("correct_answer", updateLeaderboard);
    socket.on("game_ended", gameEnded);

    // Clean up the event listeners when component unmounts
    return () => {
      socket.off("room_game_init");
      socket.off("new_question", newQuestion);
      socket.off("leaderboard_updated", updateLeaderboard);
      socket.off("correct_answer", updateLeaderboard);
      socket.off("game_ended", gameEnded);
    };
  }, [roomId]);

  const handleQuit = (roomId) => {
    socket.emit("leave_room", parseInt(roomId));
    navigate("/", { replace: true });
  };
  return (
    <Container maxWidth="lg" style={{ height: "100%", gap: 3 }}>
      <Stack
        spacing={2}
        direction="column"
        style={{ height: "100%", flex: 1, justifyContent: "space-between" }}
      >
        <Stack direction="row" justifyContent="space-between">
          <img src="/logo.svg" alt="Logo" style={{ maxWidth: "30px" }} />
          <Button
            type="text"
            color="info"
            onClick={() => {
              handleQuit(roomId);
            }}
          >
            <Typography>LEAVE</Typography>
          </Button>
        </Stack>

        <Stack spacing={2}>
          <Grid
            container
            direction={isSmallScreen ? "column" : "row"}
            style={{ padding: 20 }}
          >
            <Grid item xs={12} sm={6}>
              <LobbyLeaderboard leaderboard={leaderboard} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ChatBox play={true} />
            </Grid>
          </Grid>
          {!isGameEnded && (
            <QuizQuestions
              question={question}
              setCountDownTimer={setCountDownTimer}
              timer={countDownTimer}
            />
          )}
          {isGameEnded ? (
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems={"center"}
            >
              <Button
                type="submit"
                variant="contained"
                color="info"
                startIcon={<DoorBack />}
                onClick={() => {
                  handleQuit(roomId);
                }}
              >
                LEAVE
              </Button>
            </Stack>
          ) : (
            ""
          )}
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <VolumeSlider question={question} />
          {countDownTimer ? (
            <Typography color={theme.palette.info.main}>
              {countDownTimer}
            </Typography>
          ) : (
            ""
          )}
        </Stack>
      </Stack>
    </Container>
  );
}

export default Play;
