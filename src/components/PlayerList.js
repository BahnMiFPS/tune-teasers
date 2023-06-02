import React from "react";
import { Grid, Typography } from "@mui/material";

function PlayerList({ playerList }) {
  return (
    <>
      {playerList.map((player, index) => (
        <Typography key={player.id} color={"white"}>
          {index + 1}. {player.name}
        </Typography>
      ))}
    </>
  );
}

export default PlayerList;
