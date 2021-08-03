import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';


export default function SearchBox(props) {

    return (
        <Box px={10}>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SONG</TableCell>
                            <TableCell></TableCell>
                            <TableCell>ARTIST</TableCell>
                            <TableCell>ALBUM</TableCell>
                            <TableCell>BPM</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {props.result.map((row) => (
                        <TableRow key={row.song_name}>
                            <TableCell>
                                <img src={row.image_url} height="100"/>
                            </TableCell>
                            <TableCell>{row.song_name}</TableCell>
                            <TableCell>{row.artist}</TableCell>
                            <TableCell>{row.album_name}</TableCell>
                            <TableCell>{row.bpm}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
