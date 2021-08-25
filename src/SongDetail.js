import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { Grid, Paper, Typography, Box } from '@material-ui/core';
import { CallMissedSharp } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    image:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.12,
        shadowRadius: 60,
    },
    root: {
        // minWidth: "100%",
        // minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      },
}))

export default function SongDetail(props) {
    const location = useLocation();
    const classes = useStyles();
    
    const data = location.state.data
    return (
        <div>
            <Box display="flex" justifyContent="center"> 
                <Box width={0.6} justifyContent="center" p={5}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={6} align="center">
                            <Box width="100%">
                                <img src={data.image_url} width="100%" style={{maxWidth: "300px"}}/>
                            </Box>
                            <Typography variant="h6">
                                {data.album_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.root} height="100%">
                            <Box p={3}>
                                <Typography variant="h5" color="secondary">
                                    {data.artist}
                                </Typography>
                                <br/>
                                <Typography variant="h4">
                                    {data.song_name}
                                </Typography>
                            </Box>
                            <audio
                                controls
                                src={data.preview_url}>
                                    Your browser does not support the
                                    <code>audio</code> element.
                            </audio>
                        </Grid>
                        <Grid item xs={12}>
                            bpm: {data.bpm}<br/>
                            key: {data.key}<br/>
                        </Grid>
                    </Grid>
                    
                </Box>
            </Box>
        </div>
    );
}
