import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import NoResult from "./NoResult";
import Waiting from "./Waiting";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import { API_BASE_URL } from "./constant";

export default function Content({ isSignedIn, setSignInDialogOpen }) {
  const [searchValue, setSearchValue] = useState("");
  const [result, setResult] = useState([]);
  const [isResponded, setIsResponded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    setIsResponded(false);
    setSearchValue(query.get("search"));
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch(
      `${API_BASE_URL}/track?search=${query.get(
        "search"
      )}`,
      requestOptions
    )
      .then((response) => {
        if (response.status === 404) {
          setResult([]);
          setIsResponded(true);
          throw new Error(response.statusText);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setResult(data);
        setIsResponded(true);
      })
      .catch((err) => console.log(err));
  }, [location]);

  return (
    <div>
      <SearchBox />
      {!isResponded && <Waiting />}
      {isResponded && result.length !== 0 && (
        <SearchResult
          isSignedIn={isSignedIn}
          setSignInDialogOpen={setSignInDialogOpen}
          result={result}
          ranking={false}
          title={`Search Results for "${searchValue}"`}
        />
      )}
      {isResponded && result.length === 0 && (
        <NoResult searchValue={searchValue} />
      )}
    </div>
  );
}
