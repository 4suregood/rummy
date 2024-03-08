import React, { useState, useEffect } from 'react';

const Deck = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    init();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const init = () => {
    for (let l = 0; l < opt.loop; l++) {
      for (let i = start; i <= end; i++) {
        setCards((prevCards) => [
          ...prevCards,
          new Card('h', i, document.body),
          new Card('s', i, document.body),
          new Card('d', i, document.body),
          new Card('c', i, document.body),
        ]);
      }
    }

    if (opt.blackJoker) {
      setCards((prevCards) => [...prevCards, new Card('bj', 0, document.body)]);
    }

    if (opt.redJoker) {
      setCards((prevCards) => [...prevCards, new Card('rj', 0, document.body)]);
    }

    shuffle(cards);
  };

  const shuffle = (deck) => {
    let i = deck.length;
    if (i === 0) return;

    while (--i) {
      const j = Math.floor(Math.random() * (i + 1));
      const tempi = deck[i];
      const tempj = deck[j];
      deck[i] = tempj;
      deck[j] = tempi;
    }
  };

  const toString = () => {
    return 'Deck';
  };

  const deal = (count, hands, speed, callback) => {
    let i = 0;
    const totalCount = count * hands.length;

    function dealOne() {
      if (cards.length === 0 || i === totalCount) {
        if (callback) {
          callback();
        }
        return;
      }
      hands[i % hands.length].addCard(cards[cards.length - 1]);
      hands[i % hands.length].render({
        callback: dealOne,
        speed: speed,
      });
      i++;
    }

    dealOne();
  };

  return (
    <div className="deck">
      {/* Render other Deck content here */}
    </div>
  );
};

export default Deck;
