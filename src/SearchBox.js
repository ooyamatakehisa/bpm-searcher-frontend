import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory();

    const handleSearchInputChanges = (e) => {
        props.setInputValue(e.target.value);
    }


    const getBpms = (e) => {

        e.preventDefault()
        props.setIsSearched(true)
        props.setIsResponded(false)
        props.setResult([])
        props.setSearchValue(props.inputValue)

        history.push({
            pathname: "/",
            search:  '?search=' + props.inputValue
        })

        const params = { // 渡したいパラメータをJSON形式で書く
            search: props.inputValue
        };
        const query_params = new URLSearchParams(params)
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch('https://bpm-searcher.herokuapp.com/api?' + query_params, requestOptions)
            .then(response => {
                if (response.status === 404) {
                    props.setResult([])
                    props.setIsResponded(true)
                    throw new Error(response.statusText);
                } else {
                    return response.json()
                }
            }).then(data => {
                props.setResult(data)
                props.setIsResponded(true)
            }).catch(err => console.log(err))
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            <Box p={4}>
                <Paper component="form" className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder="Search Songs or Artists"
                        inputProps={{ 'aria-label': 'search songs or artists' }}
                        value={props.inputValue}
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
