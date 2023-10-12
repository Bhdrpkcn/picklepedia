import React from "react";
import "./card.css";

export const Card = ({ results, episodeResults }) => {

  if (!episodeResults || !results) {
    return <div className="warningMessage">No pickle Found...</div>;
  }


  let display;

  if (results) {
    display = results.map((result) => {
      let { id, name, location, image, status, species, episode, characters } =
        result;

      // Karakterin bölümlerini bul

      let characterEpisodeIds = episode.map((epi) =>
        epi.replace(`https://rickandmortyapi.com/api/episode/`, "")
        );
        
        let characterEpisodes = episodeResults.filter((episode) =>
        characterEpisodeIds.includes(episode.id.toString())
        );
       
        let badgeClassName = "";
        
        if (status === "Alive") {
          badgeClassName = "statusAlive";
        } else if (status === "Dead") {
          badgeClassName = "statusDead";
        } else if (status === "unknown") {
          badgeClassName = "statusUnknown";
        }

      return (
        <div key={id} className="card">
          <div>
            <img className="picture" src={image} alt={name} />
          </div>
          <div className="cardInfo">
            <div className="cardName">
              {name} ({species}) {id}
            </div>
            <div className="cardLoc">
              Last Location<div className="cardLocData">{location.name}</div>
            </div>

            <div className="cardEpisode">
              {characterEpisodes.map((characterEpisode) => (
                <div key={characterEpisode.id} className="episodeRow">
                  <div>{characterEpisode.name}</div>
                  <div className="episodeData">{characterEpisode.air_date}</div>
                  
                </div>
              ))}
            </div>
          </div>
          <div className={`badge ${badgeClassName}`}>{status}</div>
        </div>
      );
    });
  } else {
    display = "No pickle Found";
  }
  return <>{display}</>;
};
