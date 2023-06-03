import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme/theme";
import "./style.css";
import PlaylistCard from "./PlaylistCard";
const RowFade = styled("div")(({ fadeBackgroundImage }) => ({
  position: "absolute",
  right: theme.spacing(1),
  height: "140px",
  width: "50px",
  padding: theme.spacing(0, 6),
  backgroundImage: fadeBackgroundImage
    ? `linear-gradient(to right, rgb(20,20,20,0) 0%, rgb(20,20,20,1) 100%)`
    : `linear-gradient(to right, rgba(255,255,255,0) 100%, #fff 100%)`,
  opacity: fadeBackgroundImage ? 1 : 0, // Set opacity to 1 when fadeBackgroundImage is true, 0 otherwise
  transition: "background-image .4s ease-in-out, opacity .4s ease-in-out", // Add transition for opacity
}));

function PlaylistsRow({ title, url }) {
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fadeBackgroundImage, setFadeBackgroundImage] = useState(true);

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

  function handleScroll(event) {
    const slider = event.target;
    const scrollLeft = slider.scrollLeft;
    if (scrollLeft < 200) {
      setFadeBackgroundImage(true);
    } else {
      setFadeBackgroundImage(false);
    }
  }
  return (
    <>
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : playlists.length > 1 ? (
        <div className="row">
          <div className="row-title">{title}</div>
          <div className="row-posters" onScroll={handleScroll}>
            {playlists.map((playlist) => (
              <PlaylistCard
                key={playlist.id}
                id={playlist.id}
                image={playlist.image}
                name={playlist.name}
              />
            ))}
            <RowFade fadeBackgroundImage={fadeBackgroundImage}></RowFade>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default PlaylistsRow;
