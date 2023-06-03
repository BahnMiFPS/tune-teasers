import React from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import { Card, CardActionArea, CardMedia } from "@mui/material";

function PlaylistCard({ id, image, name }) {
  const { roomId } = useParams();

  const handleCardClick = () => {
    console.log(id);
    //start the game here after count down
  };
  return (
    <Link
      className="movie-card-container"
      //   to={`/${mediaType === "tv" ? "tv" : "movie"}/${id}`}
    >
      <Card className="movie-card">
        <CardActionArea onClick={handleCardClick}>
          <CardMedia component="img" image={image} alt={name} />
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default PlaylistCard;
