import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";

function PlayerList({ playerList }) {
  console.log(
    "🚀 ~ file: PlayerList.js:5 ~ PlayerList ~ playerList:",
    playerList
  );
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
      {playerList.map((player, index) => (
        <Typography key={player._id} color={"white"}>
          {index + 1}. {player.name}
        </Typography>
      ))}
    </Grid>
  );
}

export default PlayerList;
