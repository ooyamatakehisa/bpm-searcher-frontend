import React, { useState, useEffect } from "react";

import Waiting from "./Waiting";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import { API_BASE_URL } from "./constant";

export default function Content({ isSignedIn, setSignInDialogOpen }) {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/ranking`)
      .then((response) => response.json())
      .then((data) => {
        setResult(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <SearchBox />
      {result.length === 0 && <Waiting />}
      {result.length !== 0 && (
        <SearchResult
          isSignedIn={isSignedIn}
          setSignInDialogOpen={setSignInDialogOpen}
          result={result}
          ranking={true}
          title={"Spotify Top Chart"}
        />
      )}
    </div>
  );
}
