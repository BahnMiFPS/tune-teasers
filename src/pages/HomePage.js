import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import PlayerNameForm from "../components/PlayerNameForm";
function HomePage() {
  return (
    <Box
      sx={{
        backgroundImage: "url(./background.png)",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        padding: 0,
        margin: 0,
        display: "flex", // Add this line
        justifyContent: "center", // Add this line
        alignItems: "center", // Add this line
      }}
    >
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
            <PlayerNameForm />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
