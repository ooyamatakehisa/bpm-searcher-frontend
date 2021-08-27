import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import GitHubIcon from '@material-ui/icons/GitHub';
import { useHistory } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Bowlby One SC',
    ].join(','),
  },});

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      cursor: 'pointer'
    },
    logo:{
        cursor: 'pointer'
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
  },
}));

export default function PrimarySearchAppBar(props) {
    const classes = useStyles();
    const history = useHistory();

    function onClickGithub() {
        const url = 'https://github.com/ooyamatakehisa/bpm-searcher'
        window.open(url, '_blank')
    }
    
    const onClickAppBar = () => {
        props.reset()
        history.push("/")
    }

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                {/* <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton> */}
                <Box pr={2} className={classes.logo} onClick={onClickAppBar}>
                    <img src="./favicon.svg" height="25" />
                </Box>
                <ThemeProvider theme={theme}>
                <Typography className={classes.title} variant="h5" noWrap onClick={onClickAppBar}>
                    BPM Searcher
                </Typography>
                </ThemeProvider>
                <div className={classes.grow} />

                <IconButton aria-label="show 17 new notifications" color="inherit" onClick={onClickGithub}>
                    <GitHubIcon />
                </IconButton>

                </Toolbar>
            </AppBar>
        </div>
    );
}
