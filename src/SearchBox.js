import React, { useState, useEffect } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box, Paper, IconButton, InputBase, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    height: 55,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBox() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get("search") !== null) {
      setInputValue(query.get("search"));
    }
  }, [location]);

  const handleSearchInputChanges = (e) => {
    setInputValue(e.target.value);
  };

  const getBpms = () => {
    if (inputValue != "") {
      history.push({
        pathname: "/track",
        search: `?search=${inputValue}`,
      });
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box py={4} width={{ xs: 0.9, sm: 0.7, xl: 0.4 }}>
        <Paper className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search Songs or Artists"
            inputProps={{ "aria-label": "search songs or artists" }}
            value={inputValue}
            onChange={handleSearchInputChanges}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                getBpms();
              }
            }}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            onClick={getBpms}
            aria-label="search"
            size="large"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
    </Grid>
  );
}
