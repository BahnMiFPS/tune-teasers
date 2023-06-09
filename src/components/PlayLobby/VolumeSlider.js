import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";

export default function VolumeSlider({ question }) {
  const audioRef = useRef(null);
  const [value, setValue] = useState(20);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.volume = value / 100; // Set initial volume based on the value state

      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Auto-play was blocked. Show a UI element to let the user manually start playback.
          setAutoplayBlocked(true);
        });
      }
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const audioElement = audioRef.current;

    if (audioElement) {
      audioElement.volume = newValue / 100; // Convert slider value to a range between 0 and 1
    }
  };

  const handlePlayback = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.play();
      setAutoplayBlocked(false);
    }
  };

  return (
    <Box sx={{ width: 200 }}>
      <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
        <audio ref={audioRef} src={question?.preview_url} />
        <VolumeDown sx={{ fill: "white" }} />
        <Slider
          aria-label="Volume"
          color="info"
          value={value}
          onChange={handleChange}
        />
        <VolumeUp sx={{ fill: "white" }} />
        {autoplayBlocked && (
          <button onClick={handlePlayback}>Allow Autoplay</button>
        )}
      </Stack>
    </Box>
  );
}
