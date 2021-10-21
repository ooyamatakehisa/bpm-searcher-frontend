import React, { useEffect, useState } from "react";
import axios from "axios";
import firebase from "firebase";
import { useHistory, useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
// import Waiting from "./Waiting";

export default function Playlist({ isSignedIn, setSignInDialogOpen }) {
  const [playlistInfos, setPlaylistInfos] = useState([]);
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
          .get(
            `https://bpm-searcher.herokuapp.com/api/v1/user/${user.uid}/playlist`,
            config
          )
          .then((data) => {
            setPlaylistInfos(data.data);
          })
          .catch((err) => console.log(err));
      } else {
        setSignInDialogOpen();
      }
    })();
  }, [isSignedIn, setSignInDialogOpen, uid]);

  const onClickPlaylist = (row) => () => {
    history.push(`/user/${uid}/playlist/${row.id}`);
  };

  return (
    <Box width={1} display="flex" justifyContent="center">
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
              <Card onClick={onClickPlaylist(row)}>
                <CardHeader
                  // avatar={
                  //   <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  //     R
                  //   </Avatar>
                  // }
                  // action={
                  //   <IconButton aria-label="settings">
                  //     <MoreVertIcon />
                  //   </IconButton>
                  // }
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
    </Box>
  );
}
