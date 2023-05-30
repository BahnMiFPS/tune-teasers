import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import PlayerList from "../components/PlayerList";
import SongThemes from "../components/SongThemes";
import { Share } from "@mui/icons-material";

function Lobby() {
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
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                <Button type="text" disableRipple>
                  BACK
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="h5" color={"white"}>
                  CONFIGURE GAME
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: "1.25rem" }}>
                  Host: "host name"
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            spacing={4}
            direction={"row"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <PlayerList />
            <SongThemes />
          </Grid>
          <Grid
            item
            container
            spacing={4}
            direction={"row"}
            justifyContent="space-around"
            alignItems={"center"}
          >
            <Button
              type="submit"
              variant="contained"
              color="info"
              startIcon={<Share />}
            >
              Invite Friends
            </Button>
            <Button type="submit" variant="contained" color="warning">
              Start Game
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

export default Lobby;
