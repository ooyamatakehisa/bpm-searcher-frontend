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
import { useSnackbar } from "notistack";
import { DeleteSweep, Create } from "@mui/icons-material";
import CreatePlaylistDialog from "./CreatePlaylistDialog";
import { API_BASE_URL } from "./constant";
import Loading from "./Loading";
import SignInPage from "./SignInPage";

export default function Playlist({ isSignedIn, isLoadingSignIn }) {
  const [playlistInfos, setPlaylistInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNoPlaylist, setHasNoPlaylist] = useState(false);
  const [openCreatePlaylistDialog, setOpenCreatePlaylistDialog] =
    useState(false);
  const [playlistIdxForDeletion, setPlaylistIdxForDeletion] =
    React.useState(null);
  const [openDeletePlaylistDialog, setOpenDeletePlaylistDialog] =
    useState(false);
  const { enqueueSnackbar } = useSnackbar();
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
            setHasNoPlaylist(data.data.length === 0);
          })
          .catch((err) => console.log(err));
      }
    })();
  }, [isSignedIn, uid]);

  const openDeleteDialog = (index) => (e) => {
    e.stopPropagation();
    setOpenDeletePlaylistDialog(true);
    setPlaylistIdxForDeletion(index);
  };

  const callbackCreatePlaylist = (playlistInfo) => {
    setPlaylistInfos((prev) => {
      const temp = [...prev];
      temp.push(playlistInfo);
      return temp;
    });
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
          setHasNoPlaylist(playlistInfos.length === 0);

          enqueueSnackbar(
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

  if (isLoadingSignIn || isLoading) {
    return <Loading />;
  } else if (!isSignedIn) {
    return <SignInPage />;
  } else {
    return (
      <Box width={1} display="flex" justifyContent="center">
        <Box width={1} py={10} justifyContent="center">
          <Box pb={5}>
            <Button
              variant="outlined"
              startIcon={<Create />}
              onClick={() => setOpenCreatePlaylistDialog(true)}
            >
              Create Playlist
            </Button>
          </Box>
          {hasNoPlaylist && (
            <Typography variant="body1" color="text.secondary">
              There is no playlist. <br />
              You can create a playlist from "CREATE PlAYLIST" button above.
            </Typography>
          )}
          {!hasNoPlaylist && (
            <Grid
              container
              direction="row"
              alignItems="center"
              alignContent="center"
              spacing={2}
              width={1}
            >
              {playlistInfos.map((row, index) => (
                <Grid item xs={12} sm={4} md={3} xl={2} key={row.id}>
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
                        Created at
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {row.created_at}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <CreatePlaylistDialog
          openCreatePlaylistDialog={openCreatePlaylistDialog}
          setOpenCreatePlaylistDialog={setOpenCreatePlaylistDialog}
          onClickCompleteCallback={callbackCreatePlaylist}
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
}
