import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  IconButton,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Divider,
} from "@mui/material";
import { Reorder, DeleteSweep } from "@mui/icons-material";
import firebase from "firebase";
import axios from "axios";
import { useSnackbar } from "notistack";

import { API_BASE_URL } from "./constant";
import Loading from "./Loading";
import SignInPage from "./SignInPage";
import UpdatePlaylistDialog from "./UpdatePlaylistDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

export default function DraggableTable({ isSignedIn, isLoadingSignIn }) {
  const [playlistTracks, setplaylistTracks] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openUpdatePlaylistDialog, setOpenUpdatePlaylistDialog] =
    useState(false);
  const history = useHistory();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  let { playlistId } = useParams();

  useEffect(() => {
    (async () => {
      if (isSignedIn) {
        const user = await firebase.auth().currentUser;
        const id_token = await user.getIdToken(false);
        const config = {
          headers: { Authorization: `Bearer ${id_token}` },
        };
        axios
          .get(
            `${API_BASE_URL}/user/${user.uid}/playlist/${playlistId}`,
            config
          )
          .then((data) => {
            setplaylistTracks(data.data.playlist_tracks);
            setPlaylistInfo(data.data.playlist_info);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      }
    })();
  }, [isSignedIn, playlistId]);

  const deleteTrack = (playlistTrack, index) => {
    (async () => {
      const user = firebase.auth().currentUser;
      const id_token = await user.getIdToken(false);
      const config = {
        headers: { Authorization: `Bearer ${id_token}` },
      };
      axios
        .delete(
          `${API_BASE_URL}/user/${user.uid}/playlist/${playlistId}/track/${playlistTrack.id}`,
          config
        )
        .then((data) => {
          playlistTracks.splice(index, 1);
          setplaylistTracks((prev) => {
            const temp = [...prev];
            return temp;
          });

          setPlaylistInfo({
            ...playlistInfo,
            num_tracks: playlistInfo.num_tracks - 1,
            image_url:
              playlistTracks.length > 0
                ? playlistTracks[0].track.image_url
                : null,
          });
          enqueueSnackbar(
            `"${playlistTrack.track.song_name} (${playlistTrack.track.artist})" is romoved from your playlist !`
          );
        })
        .catch((err) => console.log(err));
    })();
  };

  // normally one would commit/save any order changes via an api call here...
  const handleDragEnd = (result, provided) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    setplaylistTracks((prev) => {
      const temp = [...prev];
      const sourceIdx = result.source.index;
      const destinationIdx = result.destination.index;
      temp.splice(sourceIdx, 1);
      temp.splice(destinationIdx, 0, prev[sourceIdx]);

      setPlaylistInfo((prev) => {
        prev.image_url = temp[0].track.image_url;
        return prev;
      });

      return temp;
    });

    (async () => {
      const user = firebase.auth().currentUser;
      const id_token = await user.getIdToken(false);
      const config = {
        headers: { Authorization: `Bearer ${id_token}` },
      };
      const body = {
        orderFrom: result.source.index + 1,
        orderTo: result.destination.index + 1,
      };
      axios
        .patch(
          `${API_BASE_URL}/user/${user.uid}/playlist/${playlistId}/track`,
          body,
          config
        )
        .catch((err) => console.log(err));
    })();
  };

  const datetime2date = (datetime) => {
    if (datetime == null) return "";
    const datetimes = datetime.split(" ");
    return datetimes.slice(0, 4).join(" ");
  };

  const handleLink = (path, row) => {
    history.push(`/track/${path}`, { data: row });
  };

  if (isLoadingSignIn || isLoading) {
    return <Loading />;
  } else if (!isSignedIn) {
    return <SignInPage />;
  } else {
    return (
      <Box width={1} display="flex" justifyContent="center">
        <Box
          width={{ xs: 0.9, sm: 0.8, xl: 0.5 }}
          justifyContent="center"
          p={5}
        >
          <Grid container spacing={8}>
            <Grid item xs={12} sm={3} align="center">
              <Grid container direction="column" spacing={4}>
                <Grid item xs={12} sm={6} align="center">
                  <Box width="100%">
                    <img
                      src={playlistInfo.image_url}
                      width="100%"
                      style={{ maxWidth: "300px" }}
                      alt={playlistInfo.name}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} className={classes.root}>
                  <Box
                    onClick={() => setOpenUpdatePlaylistDialog(true)}
                    style={{ cursor: "pointer" }}
                  >
                    <Typography variant="h4">{playlistInfo.name}</Typography>
                    <Typography variant="h5" color="textSecondary">
                      {playlistInfo.desc}
                    </Typography>
                  </Box>
                  <Box py={2}>
                    <Divider />
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {playlistInfo.num_tracks} songs
                    <br />
                    Updated at {datetime2date(playlistInfo.created_at)}
                    <br />
                    Updated at {datetime2date(playlistInfo.updated_at)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={9} align="center">
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">
                        <Typography variant="subtitle1" gutterBottom>
                          SONG
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                        ></Typography>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell width="15%" align="center">
                        <Typography variant="subtitle1" gutterBottom>
                          BPM
                        </Typography>
                      </TableCell>
                      <TableCell width="15%" align="center">
                        <Typography variant="subtitle1" gutterBottom>
                          DELETE
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable" direction="vertical">
                      {(droppableProvided) => (
                        <TableBody
                          ref={droppableProvided.innerRef}
                          {...droppableProvided.droppableProps}
                        >
                          {playlistTracks.map((plyalistTrack, index) => (
                            <Draggable
                              key={plyalistTrack.id}
                              draggableId={plyalistTrack.id}
                              index={index}
                            >
                              {(draggableProvided, snapshot) => {
                                return (
                                  <TableRow
                                    hover={true}
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.draggableProps}
                                    style={{
                                      ...draggableProvided.draggableProps.style,
                                      cursor: "pointer",
                                    }}
                                  >
                                    <TableCell align="center">
                                      <div
                                        {...draggableProvided.dragHandleProps}
                                      >
                                        <Reorder />
                                      </div>
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      onClick={() =>
                                        handleLink(
                                          plyalistTrack.track.spotify_id,
                                          plyalistTrack.track
                                        )
                                      }
                                    >
                                      <img
                                        src={plyalistTrack.track.image_url}
                                        height="100"
                                        alt={plyalistTrack.track.song_name}
                                      />
                                    </TableCell>
                                    <TableCell
                                      align="center"
                                      onClick={() =>
                                        handleLink(
                                          plyalistTrack.track.spotify_id,
                                          plyalistTrack.track
                                        )
                                      }
                                    >
                                      <Typography variant="h6" gutterBottom>
                                        {index + 1}
                                      </Typography>
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      onClick={() =>
                                        handleLink(
                                          plyalistTrack.track.spotify_id,
                                          plyalistTrack.track
                                        )
                                      }
                                    >
                                      <Typography variant="h6">
                                        <Box fontWeight="fontWeightMedium">
                                          {plyalistTrack.track.song_name}
                                        </Box>
                                      </Typography>
                                      <div>{plyalistTrack.track.artist}</div>
                                    </TableCell>
                                    <TableCell align="center">
                                      <Typography variant="h5" gutterBottom>
                                        {Math.round(plyalistTrack.track.bpm)}
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                      <IconButton
                                        onClick={() =>
                                          deleteTrack(plyalistTrack, index)
                                        }
                                      >
                                        <DeleteSweep />
                                      </IconButton>
                                    </TableCell>
                                  </TableRow>
                                );
                              }}
                            </Draggable>
                          ))}
                          {droppableProvided.placeholder}
                        </TableBody>
                      )}
                    </Droppable>
                  </DragDropContext>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
        <UpdatePlaylistDialog
          openUpdatePlaylistDialog={openUpdatePlaylistDialog}
          setOpenUpdatePlaylistDialog={setOpenUpdatePlaylistDialog}
          playlistInfo={playlistInfo}
          onClickCompleteCallback={setPlaylistInfo}
        />
      </Box>
    );
  }
}
