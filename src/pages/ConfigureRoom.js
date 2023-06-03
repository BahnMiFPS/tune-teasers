import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { requests } from "../api/requests";
import { useParams } from "react-router-dom";
import PlaylistsRow from "../components/Rows/PlaylistsRow";

function ConfigureRoom() {
  return (
    <Container fixed sx={{ backgroundColor: "black" }}>
      <Typography variant="h5">Pick your vibe</Typography>
      <Grid container direction="column">
        {requests.map((category, index) => {
          return (
            <Grid item xs={4}>
              <PlaylistsRow
                title={category.name}
                url={category.url}
                key={index}
              />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

export default ConfigureRoom;
