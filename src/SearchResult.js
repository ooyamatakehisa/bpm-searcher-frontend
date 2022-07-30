import { React, useState, useEffect } from "react";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import makeStyles from "@mui/styles/makeStyles";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";
import firebase from "firebase";
import { useSnackbar } from "notistack";

import CreatePlaylistDialog from "./CreatePlaylistDialog";
import { API_BASE_URL } from "./constant";

const useStyles = makeStyles({
  row: {
    cursor: "pointer",
  },
});
const ITEM_HEIGHT = 100;

export default function SearchResult({
  isSignedIn,
  setSignInDialogOpen,
  result,
  ranking,
  title,
}) {
  const history = useHistory();
  const classes = useStyles();
  const [openCreatePlaylistDialog, setOpenCreatePlaylistDialog] =
    useState(false);
  const [playlistInfos, setPlaylistInfos] = useState([]);
  const [clickedTrack, setClickedTrack] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (track) => (event) => {
    if (isSignedIn) {
      setClickedTrack(track);
      setAnchorEl(event.currentTarget);
    } else {
      setSignInDialogOpen();
      // signIn();
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const newCreatePlaylistDialog = () => {
    setOpenCreatePlaylistDialog(true);
    handleClose();
  };

  const handleLink = (path, row) => {
    history.push(`/track/${path}`, { data: row });
  };

  const createPlaylistAndAddTrack = (playlistInfo) => {
    setOpenCreatePlaylistDialog(false);
    setPlaylistInfos((prev) => {
      prev.push(playlistInfo);
      return prev;
    });
    addTrack(playlistInfo.id);
  };

  const saveBpm = (playlist_id) => {
    handleClose();
    addTrack(playlist_id);
  };

  const addTrack = (playlist_id) => {
    (async () => {
      const user = await firebase.auth().currentUser;
      const id_token = await user.getIdToken(false);
      const body = { kind: "track", spotify_id: clickedTrack.spotify_id };
      const config = {
        headers: { Authorization: `Bearer ${id_token}` },
      };

      try {
        axios
          .put(
            `${API_BASE_URL}/user/${user.uid}/playlist/${playlist_id}`,
            body,
            config
          )
          .then((data) => {
            enqueueSnackbar(
              `"${clickedTrack.song_name} (${clickedTrack.artist})" is added to your playlist !`
            );
          })
          .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
      }
    })();
  };

  useEffect(() => {
    (async () => {
      if (isSignedIn) {
        const user = await firebase.auth().currentUser;
        const id_token = await user.getIdToken(false);
        const config = {
          headers: { Authorization: `Bearer ${id_token}` },
        };
        axios
          .get(`${API_BASE_URL}/user/${user.uid}/playlist`, config)
          .then((data) => {
            setPlaylistInfos(data.data);
          })
          .catch((err) => console.log(err));
      }
    })();
  }, [isSignedIn]);

  return (
    <Box width={1} display="flex" justifyContent="center">
      <Box width={{ xs: 0.9, sm: 0.8, xl: 0.5 }} justifyContent="center">
        <Box m={2}>
          <Typography variant="h5">{title}</Typography>
        </Box>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <Typography variant="subtitle1" gutterBottom>
                    SONG
                  </Typography>
                </TableCell>
                {ranking && (
                  <TableCell align="center">
                    <Typography variant="subtitle1" gutterBottom></Typography>
                  </TableCell>
                )}
                <TableCell></TableCell>
                <TableCell width="15%" align="center">
                  <Typography variant="subtitle1" gutterBottom>
                    BPM
                  </Typography>
                </TableCell>
                <TableCell width="15%" align="center">
                  SAVE
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {result.map((row, index) => (
                <TableRow
                  key={row.spotify_id}
                  className={classes.row}
                  hover={true}
                >
                  <TableCell
                    align="center"
                    onClick={() => handleLink(row.spotify_id, row)}
                  >
                    <img src={row.image_url} height="100" alt={row.song_name} />
                  </TableCell>
                  {ranking && (
                    <TableCell
                      align="center"
                      onClick={() => handleLink(row.spotify_id, row)}
                    >
                      <Typography variant="h6" gutterBottom>
                        {index + 1}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell onClick={() => handleLink(row.spotify_id, row)}>
                    <Typography variant="h6">
                      <Box fontWeight="fontWeightMedium">{row.song_name}</Box>
                    </Typography>
                    <div>{row.artist}</div>
                  </TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleLink(row.spotify_id, row)}
                  >
                    <Typography variant="h5" gutterBottom>
                      {Math.round(row.bpm)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={handleClick(row)}
                      size="large"
                      aria-controls="basic-menu"
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <SaveAltIcon color="primary" fontSize="medium" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          key="create playlist"
          onClick={() => newCreatePlaylistDialog()}
        >
          Create a New Playlist
        </MenuItem>
        {playlistInfos.length !== 0 && <Divider />}
        {playlistInfos.map((playlist) => (
          <MenuItem key={playlist.id} onClick={() => saveBpm(playlist.id)}>
            {playlist.name}
          </MenuItem>
        ))}
      </Menu>
      <CreatePlaylistDialog
        openCreatePlaylistDialog={openCreatePlaylistDialog}
        setOpenCreatePlaylistDialog={setOpenCreatePlaylistDialog}
        onClickCompleteCallback={createPlaylistAndAddTrack}
      />
    </Box>
  );
}
