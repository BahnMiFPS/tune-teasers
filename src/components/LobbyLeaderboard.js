import React from "react";
import { Box, Container, Typography } from "@mui/material";

function LobbyLeaderboard() {
  // Mock data for leaderboard
  const leaderboardData = [
    { playerName: "Player 1", score: 100 },
    { playerName: "Player 2", score: 85 },
    { playerName: "Player 3", score: 70 },
    { playerName: "Player 4", score: 55 },
    { playerName: "Player 5", score: 40 },
  ];

  return (
    <Container
      sx={{ backgroundColor: "white", padding: "16px", borderRadius: "4px" }}
    >
      <Typography variant="h6" mb={2}>
        Leaderboard
      </Typography>
      {leaderboardData.map((data, index) => (
        <Box key={index} display="flex" alignItems="center" mb={1}>
          <Typography variant="body1">{index + 1}.</Typography>
          <Typography variant="body1" ml={1} flexGrow={1}>
            {data.playerName}
          </Typography>
          <Typography variant="body1">{data.score}</Typography>
        </Box>
      ))}
    </Container>
  );
}

export default LobbyLeaderboard;
