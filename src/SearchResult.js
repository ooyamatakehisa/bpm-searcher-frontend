import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    row:{
        cursor: 'pointer',
        "&:hover, &:focus": {
            backgroundColor: "#ececec"
          },
    }
}))
  

export default function SearchBox(props) {
    const history = useHistory();
    const classes = useStyles();
    const handleLink = (path, row) => {
        history.push(path, { data: row });
    }
    

    return (
        <Box width={1} display="flex" justifyContent="center">
            <Box width={0.85} justifyContent="center">
                <TableContainer component={Paper}>
                    <Table  aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography variant="subtitle1" gutterBottom>SONG</Typography>
                                    {/* <div>ARTIST</div> */}
                                </TableCell>
                                <TableCell></TableCell>
                                {/* <TableCell>ARTIST</TableCell> */}
                                {/* <TableCell>ALBUM</TableCell> */}
                                <TableCell width="30%" align="center">
                                    <Typography variant="subtitle1" gutterBottom>BPM</Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {props.result.map((row) => (
                            <TableRow key={row.spotify_id} onClick={() => handleLink(row.spotify_id, row)} className={classes.row}>
                                <TableCell align="center">
                                    <img src={row.image_url} height="100"/>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        <Box fontWeight="fontWeightMedium">
                                        {row.song_name}
                                        </Box>
                                    </Typography>
                                    <div>{row.artist}</div>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="h5" gutterBottom>{Math.round(row.bpm)}</Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}
