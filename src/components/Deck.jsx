import React, { useState, useEffect, useRef } from "react";

const Deck = (obj) => {
  console.log("obj=", obj);
//   console.log("xoffset=", obj.xoffset);
//   let images = require.context('../images', true);
//   const xoffset = obj.xoffset
//   // const [xoffset, setXoffset] = useState(0);
//   const [yoffset, setYoffset] = useState(400);
//   const [delta, setDelta] = useState(20);
//   const [clickCounter, setClickCounter] = useState(0);

//   const moveTitleToUp = () => {
//     setClickCounter(1)
//     setYoffset(yoffset - delta)
//   };

//   const moveTitleToDown = () => {
//     setClickCounter(0)
//     setYoffset(yoffset + delta)
//   };

  const doClick = () => {
    console.log("[Deck] doClick");
  }

  const width = '60px'
  return (
    <div style={{
        backgroundColor: "Yellow",
      position: "absolute",
      left: `${obj.xoffset}px`,
      top: `${obj.yoffset}px`,
    }}
      onClick={() => { doClick() }}
    >
      <span>Card Deck to select a card</span>
    </div>
  );
};

export default Deck;
