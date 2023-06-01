import React from "react";
import { css } from "@emotion/react";
import { Button, Container, Grid, TextField } from "@mui/material";
import { Send } from "@mui/icons-material";

export const TextInput = ({ handleInputChange, handleFormSubmit, message }) => {
  return (
    // <form css={styles} noValidate autoComplete="off">
    //   <TextField id="standard-text" label="メッセージを入力" fullWidth />
    //   <Button variant="contained" color="primary" fullWidth>
    //     <Send />
    //   </Button>
    // </form>
    <Container>
      <form onSubmit={handleFormSubmit} noValidate autoComplete="off">
        <Grid
          container
          noValidate
          autoComplete="off"
          spacing={1}
          width={"100%"}
        >
          <Grid item xs={8}>
            <TextField
              placeholder="Say Something"
              variant="standard"
              fullWidth
              value={message}
              onChange={handleInputChange}
              inputProps={{ style: { color: "white" } }}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              type="submit"
              variant="contained"
              sx={{ height: "100%" }}
              fullWidth
              startIcon={<Send />}
            >
              SEND
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};
