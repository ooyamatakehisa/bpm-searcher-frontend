import React from 'react';
import { Grid, Typography, Box } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophoneAltSlash } from '@fortawesome/free-solid-svg-icons'


export default function NoResult(props) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box p={6}>
                <FontAwesomeIcon size="5x" icon={faMicrophoneAltSlash}/>
            </Box>
            <Box pb={10}>
                <Typography variant="h6">
                    No results found for <b>{props.searchValue}</b>
                </Typography>
            </Box>
        </Grid>
    );
}
