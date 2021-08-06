import React from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Waiting(props) {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress />
        </Grid>
    );
}
