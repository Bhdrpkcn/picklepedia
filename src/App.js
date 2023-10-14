import "./App.css";
import React, { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { Locations } from "./components/Locations";
import { Episodes } from "./components/Episodes";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import Background from "./animations/Backgound";
import OpeningAnim from "./animations/OpeningAnim";
import Filter from "./components/Filters/Filter";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const initialSearch = searchParams.get("name") || "";
  const initialStatus = searchParams.get("status") || "";
  const initialSpecies = searchParams.get("species") || "";
  const initialGender = searchParams.get("gender") || "";
  let [isLoading, setIsLoading] = useState(false);

  let [pageNumber, setPageNumber] = useState(initialPage);
  let [maxPageNumber, setMaxPageNumber] = useState();
  let [search, setSearch] = useState(initialSearch);
  let [status, setStatus] = useState(initialStatus);
  let [species, setSpecies] = useState(initialSpecies);
  let [gender, setGender] = useState(initialGender);

  const [filterStatus, setFilterStatus] = useState({
    isStatusOpen: searchParams.get("isStatusOpen") === "true",
    isSpeciesOpen: searchParams.get("isSpeciesOpen") === "true",
    isGenderOpen: searchParams.get("isGenderOpen") === "true",
  });

  let [fetchedData, updateFetchedData] = useState([]);
  let [fetchedEpisodeData, updateEpisodeFetchedData] = useState([]);

  let { info, results } = fetchedData;
  let { info: infoEpisodes, results: episodeResults } = fetchedEpisodeData;

  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&species=${species}&gender=${gender}`;
  let api2 = `https://rickandmortyapi.com/api/episode`;

  useEffect(() => {
    const fetchData = async function () {
      try {
        setIsLoading(true);

        let dataPromise = fetch(api).then((res) => res.json());
        let episodeDataPromise = fetch(api2).then((res) => res.json());

        let [data, episodeData] = await Promise.all([
          dataPromise,
          episodeDataPromise,
        ]);

        updateFetchedData(data);
        updateEpisodeFetchedData(episodeData);

        if (data.info) {
          setMaxPageNumber(data.info.pages);
        } else {
          setMaxPageNumber(1);
        }

        setIsLoading(false);

        const queryParams = new URLSearchParams({
          page: pageNumber,
          name: search,
          status: status,
          species: species,
          gender: gender,
          isStatusOpen: filterStatus.isStatusOpen,
          isSpeciesOpen: filterStatus.isSpeciesOpen,
          isGenderOpen: filterStatus.isGenderOpen,
        });
        navigate(`?${queryParams.toString()}`, { replace: true });
      } catch (error) {
        console.error("Veriler alınırken bir hata oluştu", error);
        setIsLoading(false); // Hata durumunu ele alın
      }
    };
    fetchData();
  }, [
    api,
    api2,
    pageNumber,
    search,
    status,
    species,
    gender,
    filterStatus,
    navigate,
  ]);

  const homePage = () => {
    setSearch("");
    setStatus("");
    setSpecies("");
    setGender("");
    setPageNumber(1);
  };

  function CharacterContainer({ results }) {
    return (
      <div>
      <div className="container">
        <Filter
          setStatus={setStatus}
          setSpecies={setSpecies}
          setGender={setGender}
          setPageNumber={setPageNumber}
        />
        <div className="cardRow">
          <Card results={results} episodeResults={fetchedEpisodeData.results} />
        </div>
      </div>
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        maxPageNumber={maxPageNumber}
      />
      </div>
    );
  }

  function EpisodeContainer() {
    return (
      <div>
      <div className="container">
        {/* FIX THE FILTERING for EPISODES ! */}
        <div className="filter">
          <button className="mainClass">in Progress..</button>
          <button className="mainClass">in Progress..</button>
        </div>
        <div className="cardRow">
          <Episodes />
          {/* FIX Episodes needed will be passed DATA's ! */}
        </div>
        
      </div>
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        maxPageNumber={maxPageNumber}
      />
      </div>
    );
  }
  function LocationContainer() {
    return (
      <div>
      <div className="container">
        {/* FIX THE FILTERING for LOCATION ! */}
        <div className="filter">
          <button className="mainClass">in Progress..</button>
          <button className="mainClass">in Progress..</button>
        </div>
        <div className="cardRow">
          <Locations />
          {/* FIX Locations needed will be passed DATA's ! */}
        </div>
      </div>
      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        maxPageNumber={maxPageNumber}
      />
      </div>
    );
  }

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
      <Routes>
        <Route
          path="/picklepedia"
          element={
            <div className="container">
            <div className="cardRow">
              <OpeningAnim/>
            </div>
          </div>
            
          }
        />
        <Route
          path="/"
          element={
            <div className="container">
            <div className="cardRow">
              <OpeningAnim/>
            </div>
          </div>
            
          }
        />
        <Route
          path="/characters/"
          element={
            <CharacterContainer
              results={results}
              setFilterStatus={setFilterStatus}
              filterStatus={filterStatus}
            />
          }
        />
        <Route
          path="/episodes/"
          element={<EpisodeContainer results={results} />}
        />
        <Route
          path="/locations/"
          element={<LocationContainer results={results} />}
        />
      </Routes>

      <Background />
    </div>
  );
}

export default App;
