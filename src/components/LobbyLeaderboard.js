import React from "react";
import { Box, Container, Typography } from "@mui/material";

function LobbyLeaderboard({ leaderboard }) {
  console.log(
    "🚀 ~ file: LobbyLeaderboard.js:5 ~ LobbyLeaderboard ~ leaderboard:",
    leaderboard
  );
  // Mock data for leaderboard

  return (
    <Container
      sx={{ backgroundColor: "white", padding: "16px", borderRadius: "4px" }}
    >
      <Typography variant="h6" mb={2}>
        Leaderboard
      </Typography>
      {leaderboard?.map((player, index) => (
        <Box key={index} display="flex" alignItems="center" mb={1}>
          <Typography variant="body1">{index + 1}.</Typography>
          <Typography variant="body1" ml={1} flexGrow={1}>
            {player.name}
          </Typography>
          <Typography variant="body1">{player.score}</Typography>
        </Box>
      ))}
    </Container>
  );
}

export default LobbyLeaderboard;
