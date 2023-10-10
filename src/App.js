import "./App.css";
import React, { useState, useEffect } from "react";
import { Card } from "./components/Card";
import { Locations } from "./components/Locations";
import { Episodes } from "./components/Episodes";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Pagination from "./components/Pagination";
import Search from "./components/Search";
import Background from "./Backgound";
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
  let [isLoading, setIsLoading] = useState(false); // Yüklenme durumu ekleyin

  //we using useState to run setPageNumber function to update the state when pageNumber variable changes..
  let [pageNumber, setPageNumber] = useState(initialPage);
  let [maxPageNumber, setMaxPageNumber] = useState(); //we get the maxPageNumber data from api
  let [search, setSearch] = useState(initialSearch); //to run setSearch function to store search data from api
  let [status, setStatus] = useState(initialStatus); //to filter char. status
  let [species, setSpecies] = useState(initialSpecies); //to filter char. species
  let [gender, setGender] = useState(initialGender); //to filter char. species
  /*
  with "useState" we can store the data in a variable,
  and we will have a function key to change the variable data whenever the useEffect hook fetches new data.
  example analysis: let ["createdVariable", "createdVariablesFunction"] = useState([]);
  Below the "fetchedData" variable will store the data we got from the api.
  We'll use the "updateFetchedData" function to change the data whenever we want.
  */
  let [fetchedData, updateFetchedData] = useState([]);
  let [fetchedEpisodeData, updateEpisodeFetchedData] = useState([]);
  //also we destructuring(extract data to a new variable) "info" & "results" to a variable for easy and clean coding.
  //all inside now ! (info and results) :) we're gonna pass results to Card.js
  //and pass info to Pagination.js ..
  let { info, results } = fetchedData;
  let { info:infoEpisodes, results:episodeResults } = fetchedEpisodeData;

  //Stored the api Character link into a variable for easy use and understandable code.
  /* we using ${pageNumber} and ${search} for setting states getting changes etc.
  about filtering change when we look into the documentation we see we can use api uri link to seach
  names like "api-link"-"pagenumber" &name${search} so below we added next to pageNumber variable it.
  */
  let api = `https://rickandmortyapi.com/api/character/?page=${pageNumber}&name=${search}&status=${status}&species=${species}&gender=${gender}`;
  let api2 = `https://rickandmortyapi.com/api/episode`;
  /*
 useEffect(() => { }, [api]);
 1- to fetch data we use useEffect hook.
 2- we will wait data with "await" then fetch data with "fetch"
 3- then we will convert the collected data to json format with "then()" method.
 (res is turn res.json in this cede block)
 Remember : we're using "async" function because its not(or it may not) getting the data
 at the continously while runnig code. it will wait to "fetch"ed data to continue !
 IMPORTANT NOTE : 
 the data collected with ".../api/character/.." is contains "INFO" and "RESULTS" !
 and they contains a lot of data that you can easiliy access !!!
 console.log(data);
 console.log(data.results[0].location)
 console.log(data.results[0].image)
 etc..
 >>>info/count-next-pages-prev
 >>>results.[i]/created-episode-gender-id-image-location-name-origin-species-status-type-url
 */

  useEffect(() => {
    const fetchData = async function () {
      try {
        setIsLoading(true);
        // API'ye iki ayrı istek gönderiyoruz: biri karakter verilerini almak için, diğeri bölüm verilerini almak için.
        let dataPromise = fetch(api).then((res) => res.json());
        let episodeDataPromise = fetch(api2).then((res) => res.json());

        // İki isteği eşzamanlı olarak beklemek için Promise.all kullanıyoruz.
        let [data, episodeData] = await Promise.all([
          dataPromise,
          episodeDataPromise,
        ]);

        // Alınan karakter ve bölüm verilerini bileşenlerin kullanabileceği şekilde güncelliyoruz.
        updateFetchedData(data); // Karakter verileri
        updateEpisodeFetchedData(episodeData); // Bölüm verileri

        // Karakter verileri içinde sayfalama bilgisi (info) varsa, max sayfa sayısını güncelliyoruz. Aksi takdirde varsayılan değeri kullanıyoruz.
        if (data.info) {
          setMaxPageNumber(data.info.pages);
        } else {
          setMaxPageNumber(1);
        }

        // Veriler yüklendikten sonra yükleme durumunu "false" olarak güncelliyoruz.
        setIsLoading(false);

        // Filtreleme seçeneklerini ve sayfa numarasını URL'de güncelliyoruz.
        const queryParams = new URLSearchParams({
          page: pageNumber,
          name: search,
          status: status,
          species: species,
          gender: gender,
        });
        navigate(`?${queryParams.toString()}`, { replace: true });
      } catch (error) {
        console.error("Veriler alınırken bir hata oluştu", error);
        setIsLoading(false); // Hata durumunu ele alın
      }
    };
    fetchData();
  }, [api, api2, pageNumber, search, status, species, gender, navigate]);

  const homePage = () => {
    setSearch("");
    setStatus("");
    setSpecies("");
    setGender("");
    setPageNumber(1);
  };

  function CharacterContainer({ results }) {
    return (
      <div className="container">
        <Filter
          setStatus={setStatus}
          setSpecies={setSpecies}
          setGender={setGender}
          setPageNumber={setPageNumber}
        />
        <div className="cardRow">
          <Card results={results} episodeResults={fetchedEpisodeData.results} />
          {/*we passsed results into the results component*/}
        </div>
      </div>
    );
  }

  function EpisodeContainer() {
    return (
      <div className="container">
        {/* FIX THE FILTERING for EPISODES ! */}
        <Filter
          setStatus={setStatus}
          setSpecies={setSpecies}
          setGender={setGender}
          setPageNumber={setPageNumber}
        />
        <div className="cardRow">
          <Episodes />
          {/* FIX Episodes needed will be passed DATA's ! */}
        </div>
      </div>
    );
  }
  function LocationContainer() {
    return (
      <div className="container">
        {/* FIX THE FILTERING for EPISODES ! */}
        <Filter
          setStatus={setStatus}
          setSpecies={setSpecies}
          setGender={setGender}
          setPageNumber={setPageNumber}
        />
        <div className="cardRow">
          <Locations />
          {/* FIX Episodes needed will be passed DATA's ! */}
        </div>
      </div>
    );
  }

  //------------------------
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
          path="/characters"
          element={<CharacterContainer results={results} />}
        />
        <Route
          path="/episodes"
          element={<EpisodeContainer results={results} />}
        />
        <Route
          path="/locations"
          element={<LocationContainer results={results} />}
        />
      </Routes>

      <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        maxPageNumber={maxPageNumber}
      />
      {/*we passsed setPageNumber function and maxPageNumber into the Pagination component*/}
      <Background />
    </div>
  );
}

export default App;
