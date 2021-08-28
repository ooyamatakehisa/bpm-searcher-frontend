import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';
import { Grid, Card, Typography, Box } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDrum, faGuitar, faHeadphones, faCompactDisc } from '@fortawesome/free-solid-svg-icons'
import { KEY_DICT } from './constant';

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
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} align="center">
                            <Box width="100%">
                                <img src={data.image_url} width="100%" style={{maxWidth: "300px"}}/>
                            </Box>
                            <Typography variant="h6">
                                {data.album_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} className={classes.root} >
                            <Typography variant="h5" color="secondary">
                                {data.artist}
                            </Typography>
                            <Typography variant="h4">
                                {data.song_name}
                            </Typography>
                            <Box py={3}>
                                <audio
                                    controls
                                    src={data.preview_url}>
                                        Your browser does not support the
                                        <code>audio</code> element.
                                </audio>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} align="center">
                            <Card>
                                <Box p={3}>
                                    <FontAwesomeIcon size="3x" icon={faDrum}/>
                                    <Box p={1}>
                                        <Typography variant="h5" color="secondary">BPM</Typography>
                                    </Box>
                                    <Typography variant="h4">
                                        {Math.round(data.bpm)}
                                    </Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} align="center">
                            <Card>
                                <Box p={3}>
                                    <FontAwesomeIcon size="3x" icon={faGuitar}/>
                                    <Box p={1}>
                                        <Typography variant="h5" color="secondary">KEY</Typography>
                                    </Box>
                                    <Typography variant="h4">{KEY_DICT[data.key]}</Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} align="center">
                            <Card>
                                <Box p={3}>
                                    <FontAwesomeIcon size="3x" icon={faHeadphones}/>
                                    <Box p={1}>
                                        <Typography variant="h5" color="secondary">Danceability</Typography>
                                    </Box>
                                    <Typography variant="h4">{data.danceability}</Typography>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} align="center">
                            <Card>
                                <Box p={3}>
                                    <FontAwesomeIcon size="3x" icon={faCompactDisc}/>
                                    <Box p={1}>
                                        <Typography variant="h5" color="secondary">Energy</Typography>
                                    </Box>
                                    <Typography variant="h4">{data.energy}</Typography>
                                </Box>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}
