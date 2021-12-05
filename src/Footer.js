import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  Box,
  Grid,
  IconButton,
  ThemeProvider,
  StyledEngineProvider,
  Typography,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import { themeLogo } from "./App";
import { APP_NAME, BASE_URL } from "./constant";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: "#f0f3f4",
    width: "100%",
    textAlign: "center",
  },
  footerMain: {
    bottom: 0,
  },
}));

export default function Footer() {
  const classes = useStyles();
  function onClickGithub() {
    const url = "https://github.com/ooyamatakehisa/bpm-searcher";
    window.open(url, "_blank");
  }
  return (
    <div className={classes.footerMain}>
      <Box color="primary" className={classes.footer}>
        <Box p={10}>
          <Grid
            container
            direction="column"
            alignItems="center"
            alignContent="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <img src={`${BASE_URL}/favicon.svg`} height="25" alt="logo" />
            </Grid>
            <Grid item xs={12}>
              <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themeLogo}>
                  <Typography
                    variant="h5"
                    noWrap
                    color="primary"
                    display="inline"
                  >
                    {APP_NAME}
                  </Typography>
                </ThemeProvider>
              </StyledEngineProvider>
            </Grid>
            <Grid item xs={12}>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={onClickGithub}
                size="large"
              >
                <GitHubIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Box p={2}>
            <Typography>© Takehisa Oyama. All rights reserved.</Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
