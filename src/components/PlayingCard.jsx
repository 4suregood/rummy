import React, { useState, useEffect, useRef } from "react";

const PlayingCard = (obj) => {
  console.log("card=", obj.card);
  console.log("xoffset=", obj.xoffset);
  let images = require.context('../images', true);
  const xoffset = obj.xoffset
  // const [xoffset, setXoffset] = useState(0);
  const [yoffset, setYoffset] = useState(400);
  const [delta, setDelta] = useState(20);
  const [clickCounter, setClickCounter] = useState(0);

  const moveTitleToUp = () => {
    setClickCounter(1)
    setYoffset(yoffset - delta)
  };

  const moveTitleToDown = () => {
    setClickCounter(0)
    setYoffset(yoffset + delta)
  };

  const doClick = () => {

  }

  const width = '60px'
  return (
    <div style={{
      position: "absolute",
      left: `${xoffset}px`,
      top: `${yoffset}px`,
    }}
      onClick={() => clickCounter === 0 ? moveTitleToUp() : moveTitleToDown()}
    >
      <img key={obj.card.id} src={images(obj.card.imageSrc)} width={width} alt={obj.card.imageSrc} />
    </div>
  );
};

export default PlayingCard;
