import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
  IconButton,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BPM_MAX, BPM_MIN } from "./constant";

export default function MetronomeConfig({
  openMetronomeConfig,
  closeMetronomeConfig,
  defaultBpm,
}) {
  const [bpm, setBpm] = useState(defaultBpm);
  const [bpb, setBpb] = useState(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatInterval, setBeatInterval] = useState(null);

  const bpmMax = Math.max(BPM_MAX, defaultBpm);
  const bpmMin = Math.min(BPM_MIN, defaultBpm);

  const handleChange = (event, bpm) => {
    setBpm(bpm);
  };

  const playMetronome = () => {
    if (beatInterval !== null) {
    }
    setIsPlaying(true);
  };

  const stopMetronome = () => {
    clearInterval(beatInterval);
    setBeatInterval(null);
    setIsPlaying(false);
  };

  const decrementBpm = () => {
    if (bpm > bpmMin) {
      setBpm((bpm) => bpm - 1);
    }
  };

  const incrementBpm = () => {
    if (bpm < bpmMax) {
      setBpm((bpm) => bpm + 1);
    }
  };

  const closeMetronomeConfigAndStopMetronome = () => {
    closeMetronomeConfig();
    stopMetronome();
  };

  useEffect(() => {
    if (isPlaying) {
      const low =
        "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";
      const high =
        "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";
      var lowPitch = new Audio("data:audio/wav;base64," + low);
      var highPlayer = new Audio("data:audio/wav;base64," + high);
      var j = 0;
      clearInterval(beatInterval);

      const interval = setInterval(function () {
        j = j + 1;
        if (j !== 1) {
          lowPitch.play();
        } // 1拍目以外Low
        if (j === 1) {
          highPlayer.play();
        } // 1拍目のみHigh
        if (j === bpb) {
          j = 0;
        } // 指定拍でループリセット
      }, (60 / bpm) * 1000);
      setBeatInterval(interval);
    }
  }, [isPlaying, bpm, bpb]);

  return (
    <Dialog
      open={openMetronomeConfig}
      onClose={closeMetronomeConfigAndStopMetronome}
      aria-labelledby="metronome-config"
      aria-describedby="metronome-config"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Metronome Configuration</DialogTitle>
      <DialogContent>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="flex-end">
            <Typography variant="h4">{bpm}</Typography>
            <Typography ml={1}>BPM</Typography>
          </Stack>
          {!isPlaying ? (
            <IconButton size="large" onClick={playMetronome}>
              <PlayCircleIcon fontSize="large" color="primary" />
            </IconButton>
          ) : (
            <IconButton size="large" onClick={stopMetronome}>
              <StopCircleIcon fontSize="large" color="primary" />
            </IconButton>
          )}
        </Stack>

        <Stack direction="row" alignItems="center" mt={2} mb={4}>
          <IconButton onClick={decrementBpm}>
            <ArrowBackIosIcon color="primary" />
          </IconButton>
          <Slider
            value={bpm}
            min={bpmMin}
            max={bpmMax}
            onChange={handleChange}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
          <IconButton onClick={incrementBpm}>
            <ArrowForwardIosIcon color="primary" />
          </IconButton>
        </Stack>

        <FormControl>
          <InputLabel id="demo-simple-select-label">
            Beats per measure
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={bpb}
            label="Beats per measure"
            onChange={(e) => {
              setBpb(e.target.value);
            }}
            sx={{ width: "200px" }}
          >
            <MenuItem value={2}>2/4</MenuItem>
            <MenuItem value={3}>3/4</MenuItem>
            <MenuItem value={4}>4/4</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeMetronomeConfigAndStopMetronome} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
