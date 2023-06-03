import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Container,
  CircularProgress,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme/theme";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

import PlaylistCard from "./PlaylistCard";

function PlaylistsRow({ title, url, handleCardClick }) {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getTrendingPlaylists() {
      try {
        const response = await axios.get(url);
        setPlaylists(response.data.data);
        console.log(playlists);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
    getTrendingPlaylists();
  }, [url]);

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : playlists.length > 1 ? (
        <Grid container spacing="8">
          <Grid item>
            <Typography className="row-title" variant="h5" color="white">
              {title}
            </Typography>
          </Grid>
          <Grid item maxWidth={true} maxHeight={true}>
            <Swiper
              slidesPerView={6}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {playlists.map((playlist) => (
                <SwiperSlide>
                  <PlaylistCard
                    key={playlist.id}
                    id={playlist.id}
                    image={playlist.image}
                    name={playlist.name}
                    handleCardClick={handleCardClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}

export default PlaylistsRow;
