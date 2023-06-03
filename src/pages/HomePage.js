import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Outlet, useLocation, useParams } from "react-router-dom";
function HomePage() {
  return (
    <Container>
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <img src="/logo.svg" alt="Logo" style={{ maxWidth: "120px" }} />
        </Grid>
        <Grid item>
          <Typography variant="h4" align="center" color="white">
            Ready to test your music knowledge?
          </Typography>
        </Grid>
        <Grid item>
          {/* <PlayerNameForm /> */}
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomePage;
