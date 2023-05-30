import React from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";

function QuizQuestions() {
  const theme = useTheme();
  console.log(theme.palette.info);
  const questions = [
    { id: 1, question: "What is the capital of France?" },
    { id: 2, question: "Who painted the Mona Lisa?" },
    { id: 3, question: "What is the largest planet in our solar system?" },
    { id: 4, question: "Who wrote the novel 'Pride and Prejudice'?" },
  ];

  const shuffledQuestions = questions.sort(() => 0.5 - Math.random());

  return (
    <Grid item alignSelf="center" spacing={4}>
      <Typography
        variant="h5"
        textAlign="center"
        color={theme.palette.info.main}
        padding={4}
      >
        Quiz Questions
      </Typography>
      <Grid container spacing={2}>
        {shuffledQuestions.map((question) => (
          <Grid item xs={12} sm={6} key={question.id}>
            <Button variant="contained" color="warning" fullWidth>
              {question.question}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default QuizQuestions;
