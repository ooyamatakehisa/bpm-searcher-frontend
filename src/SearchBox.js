import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: "65vw",
        height: 55,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function SearchBox(props) {
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState("");

    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }


    const getBpms = (e) => {
        e.preventDefault()
        props.setIsSearched(true)
        props.setResult(null)
        const params = { // 渡したいパラメータをJSON形式で書く
            search: searchValue
        };
        const query_params = new URLSearchParams(params)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };
        // fetch('http://localhost:3000/api?' + query_params, requestOptions)
        fetch('https://bpm-searcher.herokuapp.com/api?' + query_params, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                props.setResult(data)
            });
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Box p={4}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Songs or Artists"
                        inputProps={{ 'aria-label': 'search songs or artists' }}
                        value={searchValue}
                        onChange={handleSearchInputChanges}
                    />
                    <IconButton type="submit" className={classes.iconButton} onClick={getBpms} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Box>
        </Grid>
        
    );
}
