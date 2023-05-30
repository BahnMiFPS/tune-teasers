import React from "react";
import { Grid, Typography } from "@mui/material";

function PlayerList() {
  const players = [
    { id: 1, name: "John" },
    { id: 2, name: "Emily" },
    { id: 3, name: "Michael" },
    { id: 4, name: "Sophia" },
    { id: 5, name: "William" },
    { id: 6, name: "Olivia" },
    { id: 7, name: "James" },
    { id: 8, name: "Emma" },
  ];

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
      {players.map((player) => (
        <Typography key={player.id} color={"white"}>
          {player.id}. {player.name}
        </Typography>
      ))}
    </Grid>
  );
}

export default PlayerList;
