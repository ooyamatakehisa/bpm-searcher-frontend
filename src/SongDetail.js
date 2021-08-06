import React from 'react';

import { useLocation } from 'react-router-dom';


export default function SongDetail(props) {
    const location = useLocation();
    const data = location.state.data
    return (
        <div>
            {/* {location.state.data} */}
            <img src={data.image_url} height="300"/><br/>
            {data.album_name}<br/>
            {data.song_name}<br/>
            {data.artist}<br/>
            bpm: {data.bpm}<br/>
            key: {data.key}<br/>
            <audio
                controls
                src={data.preview_url}>
                    Your browser does not support the
                    <code>audio</code> element.
            </audio>
        </div>
    );
}
