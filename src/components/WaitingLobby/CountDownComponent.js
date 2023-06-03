import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

function CountdownComponent() {
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        zIndex: 9999,
        textAlign: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography variant="h1" style={{ marginTop: "1rem" }}>
        {count}
      </Typography>
    </Box>
  );
}

export default CountdownComponent;
