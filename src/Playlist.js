import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "firebase";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import { DeleteSweep } from "@mui/icons-material";

import Snackbar from "./MySnackbar";
import { API_BASE_URL } from "./constant";
import Loading from "./Loading";

export default function Playlist({ isSignedIn, setSignInDialogOpen }) {
  const [playlistInfos, setPlaylistInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [playlistIdxForDeletion, setPlaylistIdxForDeletion] =
    React.useState(null);
  const [openDeletePlaylistDialog, setOpenDeletePlaylistDialog] =
    useState(false);
  const history = useHistory();
  const { uid } = useParams();

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
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      } else {
        setSignInDialogOpen();
      }
    })();
  }, [isSignedIn, setSignInDialogOpen, uid]);

  const openDeleteDialog = (index) => (e) => {
    e.stopPropagation();
    setOpenDeletePlaylistDialog(true);
    setPlaylistIdxForDeletion(index);
  };

  const deletePlaylist = () => {
    const playlistInfo = playlistInfos[playlistIdxForDeletion];
    (async () => {
      const user = firebase.auth().currentUser;
      const id_token = await user.getIdToken(false);
      const config = {
        headers: { Authorization: `Bearer ${id_token}` },
      };
      axios
        .delete(
          `${API_BASE_URL}/user/${user.uid}/playlist/${playlistInfo.id}`,
          config
        )
        .then((data) => {
          playlistInfos.splice(playlistIdxForDeletion, 1);
          setPlaylistInfos((prev) => {
            const temp = [...prev];
            return temp;
          });

          setSnackbarOpen(true);
          setSnackbarMessage(
            `"${playlistInfo.name}" is romoved from your playlist list !`
          );
          setOpenDeletePlaylistDialog(false);
        })
        .catch((err) => console.log(err));
    })();
  };

  const onClickPlaylist = (row) => () => {
    history.push(`/user/${uid}/playlist/${row.id}`);
  };

  return (
    <Box width={1} display="flex" justifyContent="center">
      {isLoading && <Loading />}
      {!isLoading && (
        <Box width={0.8} py={10} justifyContent="center">
          <Grid
            container
            direction="row"
            alignItems="center"
            alignContent="center"
            spacing={2}
            width={1}
          >
            {playlistInfos.map((row, index) => (
              <Grid item xs={3} key={row.id}>
                <Card
                  onClick={onClickPlaylist(row)}
                  style={{ cursor: "pointer" }}
                >
                  <CardHeader
                    action={
                      <IconButton
                        aria-label="settings"
                        onClick={openDeleteDialog(index)}
                      >
                        <DeleteSweep />
                      </IconButton>
                    }
                    title={row.name}
                    subheader={`${row.num_tracks} songs`}
                  />
                  {/* {row.image_url == null && <Divider/>} */}
                  {row.image_url != null && (
                    <CardMedia
                      component="img"
                      // height="194"
                      image={row.image_url}
                      alt={row.name}
                    />
                  )}
                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      {row.desc}
                    </Typography>
                    <Divider />

                    <Typography variant="body2" color="text.secondary">
                      <br />
                      Created At
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {row.created_at}
                    </Typography>
                  </CardContent>
                  {/* <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions> */}
                </Card>
              </Grid>
            ))}
            {/* <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid> */}
            {/* {playlist.length !== 0 && (
          <DraggableTable playlist={playlist} playlistInfo={playlistInfo} />
          )}
        {playlist.length == 0 && <Waiting />} */}
          </Grid>
        </Box>
      )}
      <Snackbar
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        message={snackbarMessage}
      />
      <Dialog
        open={openDeletePlaylistDialog}
        onClose={() => setOpenDeletePlaylistDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete this playlist ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All tracks and infomation of this playlist will be permanently
            deleted.
            <br />
            Are you sure you want to delete this playlist ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deletePlaylist} autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
