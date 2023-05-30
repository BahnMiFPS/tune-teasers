import React from "react";
import { Grid, Button, Typography } from "@mui/material";

function SongThemes() {
  const genres = [
    { title: "Hip Hop", link: "/" },
    { title: "Pop", link: "/" },
    { title: "Rock", link: "/" },
    { title: "R&B", link: "/" },
    { title: "Electronic", link: "/" },
    { title: "Country", link: "/" },
    { title: "Jazz", link: "/" },
    { title: "Reggae", link: "/" },
    { title: "Classical", link: "/" },
  ];

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" color={"white"} textAlign={"center"}>
          Pick a theme
        </Typography>

        {genres.map((genre, index) => (
          <Button
            key={index}
            variant="contained"
            fullWidth
            href={genre.link}
            size="large"
            sx={{ margin: 0.5 }}
          >
            {genre.title}
          </Button>
        ))}
      </Grid>
    </>
  );
}

export default SongThemes;
