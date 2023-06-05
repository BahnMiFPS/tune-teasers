import React from "react";
import { Container, Grid, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <Container fixed maxWidth="sm">
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <img src="/logo.svg" alt="Logo" style={{ maxWidth: "120px" }} />
        <Typography variant="h4" align="center" color="white">
          Ready to test your music knowledge?
        </Typography>
        <Outlet />
      </Stack>
    </Container>
  );
}

export default HomePage;
