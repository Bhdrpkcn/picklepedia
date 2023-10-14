import React from "react";
import "./background.css";
import pickle from "../images/logo512.png"


function Background() {
  

  return (
    <div className="main-area">
      <div className="circles">
        <div>
          <img className="pickle" src={pickle} alt="pickle2" />
        </div>
        <div>
          <img className="pickle" src={pickle} alt="pickle2" />
        </div>
        <div>
          <img className="pickle" src={pickle} alt="pickle2" />
        </div>
        <div>
          <img className="pickle" src={pickle} alt="pickle2" />
        </div>
        <div>
          <img className="pickle" src={pickle} alt="pickle2" />
        </div>

      </div>
    </div>
  );
}

export default Background;
