import React, { useState, useEffect } from "react";
import { Router, Routes, Route } from "react-router-dom";
import { Card } from "./components/Card";
import { Locations } from "./components/Locations";
import { Episodes } from "./components/Episodes";
import Navbar from "./components/Navbar";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import Background from "./Backgound";
import Filter from "./components/Filters/Filter";

function CharactersPage() {
  const [pageNumber, setPageNumber] = useState(1);
  const [maxPageNumber, setMaxPageNumber] = useState();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [fetchedData, updateFetchedData] = useState([]);
  const [fetchedEpisodeData, updateEpisodeFetchedData] = useState([]);
  const { info, results } = fetchedData;

  const api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&species=${species}&gender=${gender}`;
  const api2 = `https://rickandmortyapi.com/api/episode`;

  useEffect(() => {
    async function fetchData() {
      const data = await fetch(api).then((res) => res.json());
      updateFetchedData(data);

      if (data.info) {
        setMaxPageNumber(data.info.pages);
      } else {
        setMaxPageNumber(1);
      }

      let allEpisodeResults = [];
      let episodeData = await fetch(api2).then((res) => res.json());
      allEpisodeResults = allEpisodeResults.concat(episodeData.results);

      while (episodeData.info && episodeData.info.next) {
        episodeData = await fetch(episodeData.info.next).then((res) =>
          res.json()
        );
        allEpisodeResults = allEpisodeResults.concat(episodeData.results);
      }

      updateEpisodeFetchedData({ results: allEpisodeResults });
    }

    fetchData();
  }, [api, api2]);

  const homePage = () => {
    setSearch("");
    setStatus("");
    setSpecies("");
    setGender("");
    setPageNumber(1);
    console.log("home clicked");
  };

  return (
    <div className="App">
      <div className="header">
        <div style={{ cursor: "pointer" }} onClick={homePage}>
          picklePedia
        </div>
        <div className="pageNumber">
          {pageNumber}/{maxPageNumber}
        </div>
        <Search setSearch={setSearch} setPageNumber={setPageNumber} />
        <Navbar />
      </div>
      <div className="container">
        <Filter
          setStatus={setStatus}
          setSpecies={setSpecies}
          setGender={setGender}
          setPageNumber={setPageNumber}
        />
        <div>
          <div className="cardRow">
            <Card
              results={results}
              episodeResults={fetchedEpisodeData.results}
            />
          </div>
        </div>
      </div>
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        maxPageNumber={maxPageNumber}
      />
      <Background />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/episodes" element={<Episodes />} />
        <Route path="/locations" element={<Locations />} />
      </Routes>
    </div>
  );
}

export default App;
