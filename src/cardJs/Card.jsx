import React, { useEffect } from 'react';

const Card = ({ suit, rank, table }) => {
  const [faceUp, setFaceUp] = React.useState(false);

  useEffect(() => {
    showCard();
    moveToFront();
  }, []);

  const showCard = () => {
    const offsets = {
      c: 0,
      d: 1,
      h: 2,
      s: 3,
      rj: 2,
      bj: 3,
    };

    let xpos, ypos;
    let currentRank = rank;

    if (currentRank === 14) {
      currentRank = 1; // Aces high must work as well.
    }

    xpos = -currentRank * opt.cardSize.width;
    ypos = -offsets[suit] * opt.cardSize.height;

    rotate(0);

    setFaceUp(true);

    // Set background position and rotate
    const cardElement = document.querySelector('.card');
    cardElement.style.backgroundPosition = `${xpos}px ${ypos}px`;
    cardElement.style.transform = 'rotate(0deg)';
  };

  const rotate = (angle) => {
    const cardElement = document.querySelector('.card');
    const transformValue = `rotate(${angle}deg)`;

    ['webkit', 'moz', 'ms', ''].forEach((prefix) => {
      cardElement.style[`${prefix}Transform`] = transformValue;
    });
  };

  const moveToFront = () => {
    const cardElement = document.querySelector('.card');
    cardElement.style.zIndex = zIndexCounter++;
  };

  const hideCard = () => {
    const y = opt.cardback === 'red' ? 0 * opt.cardSize.height : -1 * opt.cardSize.height;
    const cardElement = document.querySelector('.card');
    cardElement.style.backgroundPosition = `0px ${y}px`;
    rotate(0);
  };

  const mouseEvent = (ev) => {
    const card = ev.currentTarget.dataset.card;
    if (card.container) {
      const handler = card.container._click;
      if (handler) {
        handler.func.call(handler.context || window, card, ev);
      }
    }
  };

  return (
    <div
      style={{
        width: opt.cardSize.width,
        height: opt.cardSize.height,
        backgroundImage: `url(${opt.cardsUrl})`,
        position: 'absolute',
        cursor: 'pointer',
      }}
      className="card"
      onClick={mouseEvent}
      data-card={faceUp}
    />
  );
};

export default Card;
// Define other functional components (Container, Deck, Hand, Pile) with similar structure

// const App = () => {
//   useEffect(() => {
//     cards.init({
//       // Pass necessary options
//     });
//   }, []);

//   return (
//     <div>
//       {/* Render other game components */}
//     </div>
//   );
// };

// export default App;
