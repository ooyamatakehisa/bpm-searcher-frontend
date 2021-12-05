import React from "react";
import { CircularProgress, Grid, Box } from "@mui/material";

export default function Loading() {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box p={20}>
        <CircularProgress />
      </Box>
    </Grid>
  );
}
