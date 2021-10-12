import React, { useState, useEffect } from 'react';
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
import NoResult from './NoResult'

const theme = createTheme({
    palette: {
        primary: {
            main: '#da0047',
            contrastText: '#fff',
        },
        secondary: {
            main: "#a0a0a0",
            contrastText: '#a0a0a0',
        }
    },
    typography: {
        fontFamily: [
          'Lato',
          'Raleway',
        ].join(','),
    }
})

function App() {
    const [isSearched, setIsSearched] = useState(false);
    const [isResponded, setIsResponded] = useState(false);
    const [result, setResult] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const [inputValue, setInputValue] = useState("");

    const reset = () => {
        setIsSearched(false)
        setIsResponded(false)
        setResult([])
        setSearchValue("")
    }

    useEffect(()=>{
        fetch('https://bpm-searcher.herokuapp.com/api/v1/ranking')
            .then(response => response.json())
            .then(data => {
                setRanking(data)
            }).catch(err => console.log(err))
      },[])
    
    return (
        <MuiThemeProvider theme={ theme }>
            <Router>
                <Header reset={ reset }/>
                <Switch>
                    <Route path="/" exact>
                        <SearchBox
                            setIsSearched={ setIsSearched }
                            setIsResponded={ setIsResponded }
                            setResult={ setResult }
                            inputValue={ inputValue }
                            setInputValue={ setInputValue }
                            searchValue={ searchValue }
                            setSearchValue={ setSearchValue }
                        />
                        {!isSearched &&
                            <SearchResult
                                result={ ranking }
                                ranking={ true }
                                title={"spotify top charts"}
                            />
                        }
                        {isSearched && !isResponded && 
                            <Waiting />
                        }
                        {isResponded && result.length !== 0 &&
                            <SearchResult
                                result={ result }
                                ranking={ false }
                                title={"search results for " + searchValue}
                            />
                        }
                        {isResponded && result.length === 0 && <NoResult searchValue={ searchValue }/>}
                    </Route>
                    <Route path="/:spotify_id" component={ SongDetail }/>
                </Switch>
                <Footer />
            </Router>
        </MuiThemeProvider>
    );
}

export default App;
