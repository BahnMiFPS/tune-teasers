import React from "react";
import { Button, Grid, Typography, useTheme } from "@mui/material";

function QuizQuestions({ question }) {
  const theme = useTheme();
  const handleQuestionButton = (answerIndex) => {
    console.log(answerIndex);
  };
  return (
    <>
      {question ? (
        <Grid item alignSelf="center" spacing={4}>
          <Typography
            variant="h5"
            textAlign="center"
            color={theme.palette.info.main}
            padding={4}
          >
            {question.question}
          </Typography>

          <Grid container spacing={2}>
            {question.options?.map((option, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Button
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={() => {
                    handleQuestionButton(index);
                  }}
                >
                  {option}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : (
        ""
      )}
    </>
  );
}

export default QuizQuestions;
