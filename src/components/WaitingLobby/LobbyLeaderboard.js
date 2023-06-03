import React from "react";
import { Box, Container, Typography } from "@mui/material";

function LobbyLeaderboard({ leaderboard }) {
  function compareScores(a, b) {
    return b.score - a.score; // Sort in descending order based on score
  }

  const sortedLeaderboard = leaderboard?.sort(compareScores);

  return (
    <Container
      fixed
      sx={{ backgroundColor: "white", padding: "16px", borderRadius: "4px" }}
    >
      <Typography variant="h6" mb={2}>
        Leaderboard
      </Typography>
      {sortedLeaderboard?.map((player, index) => (
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
