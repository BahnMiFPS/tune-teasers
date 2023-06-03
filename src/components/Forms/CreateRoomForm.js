import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { replace, useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import socket from "../../app/socket";
function CreateRoomForm() {
  const theme = useTheme();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const generatedName = faker.person.firstName();
    setPlayerName(generatedName);
    formik.setFieldValue("name", generatedName);
  }, []);

  const formik = useFormik({
    initialValues: {
      name: playerName,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Username is invalid"),
    }),
    onSubmit: (values) => {
      let roomId = Math.floor(Math.random() * 50);
      const data = { name: values.name, roomId };
      socket.emit("create_room", data);
      navigate(`/lobby/${roomId}`, {
        replace: true,
        state: data,
      });
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      width={"100%"}
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
      <Grid item xs={12}>
        <TextField
          error={Boolean(formik.touched.name && formik.errors.name)}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
          helperText={formik.touched.name && formik.errors.name}
          variant="filled"
          margin="normal"
          fullWidth
          id="name"
          hiddenLabel
          name="name"
          autoComplete="off"
          color="info"
          sx={{
            backgroundColor: theme.palette.background.paper,
            "& .MuiInputBase-input": {
              textAlign: "center",
              color: "white",
            },
          }}
        />
      </Grid>

      <Grid item xs={6}>
        <Button type="submit" fullWidth variant="contained" color="warning">
          Create a Private Room
        </Button>
      </Grid>
    </Grid>
  );
}

export default CreateRoomForm;
