import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

import SearchBox from './SearchBox'
import SearchResult from './SearchResult'
import Header from './Header'
import Waiting from './Waiting'
import SongDetail from './SongDetail'

const theme = createTheme({
    palette: {
        primary: {
            main: '#da0047',
            contrastText: '#fff',
        },
    }
});

function App() {
    const [isSearched, setIsSearched] = useState(false);
    const [result, setResult] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    const reset = () => {
        setIsSearched(false)
        setResult(null)
        setSearchValue("")
    }

    return (
        <MuiThemeProvider theme={ theme }>
            <Router>
                <Header reset={ reset }/>
                <Switch>
                    <Route path="/" exact>
                        <SearchBox
                            setIsSearched={ setIsSearched }
                            setResult={ setResult }
                            searchValue={ searchValue }
                            setSearchValue={ setSearchValue }
                        />
                        {/* {!isSearched && <AppDesc />} */}
                        {(isSearched && result === null) && <Waiting />}
                        {result !== null && <SearchResult result={ result }/>}
                    </Route>
                    <Route path="/:spotify_id" component={ SongDetail }/>
                </Switch>
            </Router>
        </MuiThemeProvider>
    );
}

export default App;
