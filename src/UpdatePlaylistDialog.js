import { React, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useSnackbar } from "notistack";
import firebase from "firebase";

import { API_BASE_URL } from "./constant";

export default function UpdatePlaylistDialog({
  openUpdatePlaylistDialog,
  setOpenUpdatePlaylistDialog,
  playlistInfo,
  onClickCompleteCallback,
}) {
  const [playlistName, setPlaylistName] = useState(playlistInfo.name);
  const [playlistDescription, setPlaylistDescription] = useState(
    playlistInfo.desc
  );
  const { enqueueSnackbar } = useSnackbar();

  const handleTextfiledChange = (set) => (event) => {
    set(event.target.value);
  };

  const updatePlaylist = () => {
    (async () => {
      setOpenUpdatePlaylistDialog(false);
      const user = await firebase.auth().currentUser;
      const id_token = await user.getIdToken(false);
      let body = { name: playlistName, desc: playlistDescription };
      const config = {
        headers: { Authorization: `Bearer ${id_token}` },
      };
      try {
        const data = await axios.patch(
          `${API_BASE_URL}/user/${user.uid}/playlist/${playlistInfo.id}/info`,
          body,
          config
        );
        const newPlaylistInfo = data.data;
        if (onClickCompleteCallback !== undefined)
          onClickCompleteCallback(newPlaylistInfo);
        setPlaylistName(playlistName);
        setPlaylistDescription(playlistDescription);
        enqueueSnackbar(
          `The playlist "${newPlaylistInfo.name}" is updated !`
        );
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <div>
      <Dialog
        open={openUpdatePlaylistDialog}
        onClose={() => setOpenUpdatePlaylistDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update the playlist name and description
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box py={1}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={playlistName}
                onChange={handleTextfiledChange(setPlaylistName)}
                required={true}
                fullWidth
              />
            </Box>
            <Box py={1}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                value={playlistDescription}
                onChange={handleTextfiledChange(setPlaylistDescription)}
                multiline
                fullWidth
                rows={4}
              />
            </Box>
            You can check the playlist by clicking the icon button in the upper
            right corner.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={updatePlaylist} autoFocus>
            COMPLETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
