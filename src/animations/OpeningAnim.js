import React from "react";
import anime from "animejs";
import "./openingAnim.css";

const GRID_WIDTH = 75;
const GRID_HEIGHT = 35;

const DotGrid = () => {
  const handleDotClick = (e) => {
    anime({
      targets: ".dot-point",
      scale: [
        { value: 1.35, easing: "easeOutSine", duration: 250 },
        { value: 1, easing: "easeInOutQuad", duration: 500 },
      ],
      translateY: [
        { value: -20, easing: "easeOutSine", duration: 250 },
        { value: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      opacity: [
        { value: 1, easing: "easeOutSine", duration: 250 },
        { value: 0.5, easing: "easeInOutQuad", duration: 500 },
      ],
      delay: anime.stagger(100, {
        grid: [GRID_WIDTH, GRID_HEIGHT],
        from: e.target.dataset.index,
      }),
    });
  };
  const dots = [];
  let index = 0;

  for (let i = 0; i < GRID_WIDTH; i++) {
    for (let j = 0; j < GRID_HEIGHT; j++) {
      dots.push(
        <div
          onClick={handleDotClick}
          className="group"
          data-index={index}
          key={`${i}-${j}`}
        >
          <div className="dot-point" data-index={index} />
        </div>
      );
      index++;
    }
  }

  return (
    <div
      style={{ gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)` }}
      className="custom-grid"
    >
      {dots}
    </div>
  );
};

const OpeningAnim = () => {
  return (
    <div>
      <div className="welcomeText">WELCOME picklePedia</div>
      <div className="mainOpeningGrid">
        <DotGrid />
      </div>
    </div>
  );
};

export default OpeningAnim;
