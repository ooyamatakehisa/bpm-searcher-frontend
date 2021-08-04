import React, { useState } from 'react';
import SearchBox from './SearchBox'
import AppDesc from './AppDesc'
import SearchResult from './SearchResult'
import Header from './Header'
import Waiting from './Waiting'

import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

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
            <header>
                <Header reset={ reset }/>
            </header>
            <body>
                <SearchBox
                    setIsSearched={ setIsSearched }
                    setResult={ setResult }
                    searchValue={ searchValue }
                    setSearchValue={ setSearchValue }
                />
                {/* {!isSearched && <AppDesc />} */}
                {(isSearched && result === null) && <Waiting />}
                {result !== null && <SearchResult result={ result }/>}
            </body>
        </MuiThemeProvider>
    );
}

export default App;
