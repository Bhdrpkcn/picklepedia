import React from "react";
import "./background.css";
import "./images/pickle.png";
import "./images/logo512.png";
function Background() {
  return (
    <div className="main-area">
      <div className="circles">
        <div>
          <img className="pickle" src="./logo512.png" alt="pickle2" />
        </div>
        <div>
          <img className="pickle" src="./logo512.png" alt="pickle2" />
        </div>
        <div>
          <img className="pickle" src="./logo512.png" alt="pickle2" />
        </div>
        <div>
          <img className="pickle" src="./logo512.png" alt="pickle2" />
        </div>
        <div>
          <img className="pickle" src="./logo512.png" alt="pickle2" />
        </div>
      </div>
    </div>
  );
}

export default Background;
