import React from "react";
import GitHubIcon from '@material-ui/icons/GitHub';
import { Box, makeStyles, Grid, IconButton, ThemeProvider, Typography } from "@material-ui/core";

import { themeLogo } from './App';

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: "#f0f3f4",
        width: "100%",
        textAlign: "center"
    }
}));

const Footer = () => {
    const classes = useStyles();
    function onClickGithub() {
        const url = 'https://github.com/ooyamatakehisa/bpm-searcher'
        window.open(url, '_blank')
    }
    return (
        <Box color="primary" className={classes.footer}>
            <Box p={10} >
                <Grid container direction="column" alignItems="center" alignContent="center" spacing={2}>
                    <Grid item xs={12}>
                        <img src="./favicon.svg" height="25"/>
                    </Grid>
                    <Grid item xs={12}>
                        <ThemeProvider theme={themeLogo}>
                            <Typography variant="h5" noWrap color="primary" display="inline">
                                BPM Searcher
                            </Typography>
                        </ThemeProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <IconButton aria-label="show 17 new notifications" color="inherit" onClick={onClickGithub}>
                            <GitHubIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Box p={2}>
                    <Typography>© Takehisa Oyama. All rights reserved.</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
