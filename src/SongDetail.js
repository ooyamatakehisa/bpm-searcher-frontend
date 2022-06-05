import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import { Grid, Card, Typography, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDrum,
  faGuitar,
  faHeadphones,
  faCompactDisc,
} from "@fortawesome/free-solid-svg-icons";
import { KEY_DICT, MODE_DICT } from "./constant";
import MetronomeConfig from "./MetronomeConfig";

export default function SongDetail() {
  const location = useLocation();
  const [openMetronomeConfig, setOpenMetronomeConfig] = useState(false);

  const closeMetronomeConfig = () => {
    setOpenMetronomeConfig(false);
  };

  const showBpmConfig = () => {
    setOpenMetronomeConfig(true);
  };

  const data = location.state.data;
  return (
    <Box display="flex" justifyContent="center">
      <Box width={{ xs: 0.8, sm: 0.6 }} justifyContent="center" py={5}>
        <Grid container spacing={4}>
          <Grid item container xs={12} sm={6} justifyContent="center">
            <img
              src={data.image_url}
              style={{ maxWidth: "300px" }}
              alt={data.song_name}
            />
            <Typography variant="h6">{data.album_name}</Typography>
          </Grid>
          <Grid
            item
            container
            xs={12}
            sm={6}
            flexDirection="column"
            justifyContent="center"
            alignItems={{ xs: "center", sm: "stretch" }}
          >
            <Typography variant="h5" color="textSecondary">
              {data.artist}
            </Typography>
            <Typography variant="h4">{data.song_name}</Typography>
            <Box py={3}>
              <audio controls src={data.preview_url}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={4} mt={3}>
          <Grid item xs={12} sm={6} align="center">
            <Card
              onClick={showBpmConfig}
              elevation="5"
              sx={{
                ":hover": {
                  boxShadow: 15, // theme.shadows[20]
                },
                cursor: "pointer",
              }}
            >
              <Box p={3}>
                <FontAwesomeIcon size="3x" icon={faDrum} />
                <Box p={1}>
                  <Typography variant="h5" color="textSecondary">
                    BPM
                  </Typography>
                </Box>
                <Typography variant="h4">{Math.round(data.bpm)}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} align="center">
            <Card elevation="5">
              <Box p={3}>
                <FontAwesomeIcon size="3x" icon={faGuitar} />
                <Box p={1}>
                  <Typography variant="h5" color="textSecondary">
                    KEY
                  </Typography>
                </Box>
                <Typography variant="h4">
                  {KEY_DICT[data.key]} {MODE_DICT[data.mode]}
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} align="center">
            <Card elevation="5">
              <Box p={3}>
                <FontAwesomeIcon size="3x" icon={faHeadphones} />
                <Box p={1}>
                  <Typography variant="h5" color="textSecondary">
                    Danceability
                  </Typography>
                </Box>
                <Typography variant="h4">{data.danceability}</Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} align="center">
            <Card elevation="5">
              <Box p={3}>
                <FontAwesomeIcon size="3x" icon={faCompactDisc} />
                <Box p={1}>
                  <Typography variant="h5" color="textSecondary">
                    Energy
                  </Typography>
                </Box>
                <Typography variant="h4">{data.energy}</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <MetronomeConfig
        openMetronomeConfig={openMetronomeConfig}
        closeMetronomeConfig={closeMetronomeConfig}
        defaultBpm={Math.round(data.bpm)}
      />
    </Box>
  );
}
