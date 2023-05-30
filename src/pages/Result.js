import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import PlayerList from "../components/PlayerList";
import SongThemes from "../components/SongThemes";
import {
  BackHand,
  Backspace,
  DoorBack,
  Leaderboard,
  Quiz,
  Remove,
  Share,
} from "@mui/icons-material";
import QuizQuestions from "../components/QuizQuestions";
import LobbyLeaderboard from "../components/LobbyLeaderboard";

function Result() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        backgroundImage: "url(./background.png)",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Grid
          container
          flexDirection="column"
          justifyContent="space-between"
          height="100vh"
          spacing={4}
        >
          <Grid item>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems={"normal"}
            >
              <Grid item>
                <img src="/logo.svg" alt="Logo" style={{ maxWidth: "30px" }} />
              </Grid>
              <Grid item>
                <Typography
                  variant="h5"
                  textAlign="center"
                  color={theme.palette.info.main}
                >
                  Result
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
          <Grid
            item
            container
            justifyContent="space-around"
            alignItems={"center"}
          >
            <Button
              type="submit"
              variant="contained"
              color="warning"
              startIcon={<DoorBack />}
            >
              LEAVE
            </Button>
          </Grid>
          <Grid item container justifyContent="space-between">
            <Grid item>
              <Typography>Playerlist</Typography>
            </Grid>
            <Grid item>
              <Typography>Pick a theme</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Result;
