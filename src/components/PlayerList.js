import React from "react";
import { Grid, Typography } from "@mui/material";

function PlayerList({ playerList }) {
  console.log(
    "🚀 ~ file: PlayerList.js:5 ~ PlayerList ~ playerList:",
    playerList
  );
  console.log("rerendering");
  return (
    <Grid item xs={12} sm={6} md={4} sx={{ textAlign: "center" }}>
      {playerList.map((player, index) => (
        <Typography key={player.id} color={"white"}>
          {index + 1}. {player.name}
        </Typography>
      ))}
    </Grid>
  );
}

export default PlayerList;
