import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  ListItemIcon,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Logout } from "@mui/icons-material";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import makeStyles from "@mui/styles/makeStyles";

import { themeLogo } from "./App";
import { APP_NAME, DOMAIN } from "./constant";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menu: {
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
    alignSelf: "center",
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    cursor: "pointer",
  },
  logo: {
    cursor: "pointer",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickAppBar = () => {
    // props.reset();
    history.push("/");
  };

  const onClickPlaylist = () => {
    handleClose();
    history.push(`/user/${props.user.uid}/playlist`);
  };

  const signOut = () => {
    setAnchorEl(null);
    props.signOut();
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Box pr={2} className={classes.logo} onClick={onClickAppBar}>
            <img src={`https://${DOMAIN}/favicon.svg`} height="25" alt="Logo" />
          </Box>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themeLogo}>
              <Typography
                className={classes.title}
                variant="h5"
                noWrap
                onClick={onClickAppBar}
              >
                {APP_NAME}
              </Typography>
            </ThemeProvider>
          </StyledEngineProvider>
          <div className={classes.grow} />

          {!props.isSignedIn && (
            <Box px={1}>
              <Button color="secondary" onClick={props.setSignInDialogOpen}>
                <Typography style={{ fontWeight: 600 }}>Sign In</Typography>
              </Button>
            </Box>
          )}
          {props.isSignedIn && (
            <Box px={1}>
              <IconButton onClick={handleClick}>
                <Avatar
                  alt={props.user.displayName}
                  src={props.user.photoURL}
                />
              </IconButton>
              {/* <Typography display="inline">{props.user.displayName}</Typography> */}
            </Box>
          )}

          {/* <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menu}
          > */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Grid
                container
                alignContent="center"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item className={classes.menu}>
                  <Box p={2}>
                    {/* <Avatar alt={props.user.displayName} src={props.user.photoURL}/> */}
                    <img
                      alt={props.user.displayName}
                      src={props.user.photoURL}
                    />
                    <Typography variant="h6">
                      {props.user.displayName}
                    </Typography>
                    <Typography color="textSecondary">
                      {props.user.email}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </MenuItem>
            <Divider />
            <MenuItem onClick={onClickPlaylist}>
              <ListItemIcon>
                <PlaylistPlayIcon fontSize="small" />
              </ListItemIcon>
              Playlist
            </MenuItem>
            <Divider />
            <MenuItem>
              <Grid
                container
                alignContent="center"
                alignItems="center"
                justifyContent="center"
              >
                <Grid item>
                  <Box p={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={signOut}
                    >
                      <Logout fontSize="small" />
                      Sign Out
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </MenuItem>
          </Menu>
          {/* <Box px={1}>
                    <Button color="secondary" variant="outlined">
                        <Typography style={{ fontWeight: 600 }} color="info">Sign Up</Typography>
                    </Button>
                </Box> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
