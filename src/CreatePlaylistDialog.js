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
import { useSnackbar } from 'notistack';
import firebase from "firebase";

import { API_BASE_URL } from "./constant";

export default function CreatePlaylistDialog({
  openCreatePlaylistDialog,
  setOpenCreatePlaylistDialog,
  onClickCompleteCallback
}) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleTextfiledChange = (set) => (event) => {
    set(event.target.value);
  };

  const createPlaylist = () => {
    (async () => {
      setOpenCreatePlaylistDialog(false);
      const user = await firebase.auth().currentUser;
      const id_token = await user.getIdToken(false);
      let body = { name: newPlaylistName, desc: newPlaylistDescription };
      const config = {
        headers: { Authorization: `Bearer ${id_token}` },
      };
      try {
        const data = await axios.post(
          `${API_BASE_URL}/user/${user.uid}/playlist`,
          body,
          config
        );
        const playlistInfo = data.data;
        if (onClickCompleteCallback !== undefined) onClickCompleteCallback(playlistInfo);
        setNewPlaylistName("");
        setNewPlaylistDescription("");
        enqueueSnackbar(`The playlist "${playlistInfo.name}" is successfuly created !`)
      } catch (err) {
        console.log(err);
      }
    })();
  };

  return (
    <div>
      <Dialog
        open={openCreatePlaylistDialog}
        onClose={() => setOpenCreatePlaylistDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Create a New Playlist and Add the Song
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box py={1}>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={newPlaylistName}
                onChange={handleTextfiledChange(setNewPlaylistName)}
                required={true}
                fullWidth
              />
            </Box>
            <Box py={1}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                value={newPlaylistDescription}
                onChange={handleTextfiledChange(setNewPlaylistDescription)}
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
          <Button onClick={createPlaylist} autoFocus>
            COMPLETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
