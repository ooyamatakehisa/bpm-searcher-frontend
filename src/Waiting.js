import React from 'react';
import { CircularProgress, Grid, Box } from '@material-ui/core';


export default function Waiting(props) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box p={16}>
                <CircularProgress />
            </Box>
        </Grid>
    );
}
