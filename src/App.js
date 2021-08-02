import React, { useState } from 'react';
import logo from './logo.svg';
// import './App.css';
import SearchBox from './SearchBox'
import AppDesc from './AppDesc'
import SearchResult from './SearchResult'


function App() {
    const [isSearched, setIsSearched] = useState(false);
    const [result, setResult] = useState(null);

    return (
        <div className="App">
            <header className="App-header">
                <h1>BPM SEARCHER</h1>
            </header>
            <body>
                <SearchBox setIsSearched={ setIsSearched } setResult={ setResult }/>
                {!isSearched && <AppDesc />}
                {result !== null && <SearchResult result={ result }/>}
            </body>
            
        </div>
    );
}

export default App;
