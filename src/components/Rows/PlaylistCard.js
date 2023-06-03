import React, { useState } from "react";
import "./style.css";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";

function PlaylistCard({ id, image, name, handleCardClick }) {
  const { roomId } = useParams();

  return (
    <Card sx={{ width: "100%", backgroundColor: "none" }}>
      <CardActionArea onClick={() => handleCardClick(id)}>
        <CardMedia component="img" image={image} alt={name} />
      </CardActionArea>
    </Card>
  );
}

export default PlaylistCard;
