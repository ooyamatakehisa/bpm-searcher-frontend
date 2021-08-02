import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';


export default function SearchBox(props) {
    const columns = [
        {
            field: 'song',
            headerName: 'Song',
            width: 300,
            editable: true,
        },
        { field: 'artist', headerName: 'ARTIST', width: 150 },
        {
          field: 'bpm',
          headerName: 'BPM',
          width: 150,
          editable: true,
        }
    ]
    let i = 1;
    for (let res of props.result) {
        res["id"] = i
        i++
    }

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid
                rows={props.result}
                columns={columns}
                pageSize={10}
                // checkboxSelection
                // disableSelectionOnClick
                // style={{color: '#FFFFFF'}}
            />
        </div>
    );
}