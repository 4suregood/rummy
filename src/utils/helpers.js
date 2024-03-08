export const generateDeck = async (backColor) => {
  // Define the ranks and suits
  const ranks = [['2', 2], ['3', 3], ['4', 4], ['5', 5], ['6', 6], ['7', 7], ['8', 8], ['9', 9], ['10', 10], ['jack', 11], ['queen', 12], ['king', 13], ['ace', 14]];
  const suits = ['clubs', 'diamonds', 'hearts', 'spades'];

  // Create a deck of cards
  let deck = [];
  let id = 0;
  for (let suit of suits) {
    for (let rank of ranks) {
      id++;
      let value = 0;
      if (rank[0] === 'jack' || rank[0] === 'queen' || rank[0] === 'king' || rank[0] === 'ace') {
        value = 10;
      } else {
        value = parseInt(rank[0], 10)
      }
      // console.log("value=", value)
      // const imageSrc = `./images/${rank}_of_${suit}.svg`;
      const imageSrc = `./${rank[0]}_of_${suit}.svg`;
      deck.push({ 'id': id, 'rank': rank[0], 'suit': suit, 'imageSrc': imageSrc, 'value': value, 'backImageSrc': getBackImageSrc(backColor), 'faceUp': false, 'orderNo': rank[1] });
    }
  }

  console.log(deck);
  return deck
}

export const getBackImageSrc = (backColor) => {
  let backImageSrc = '';
  // console.log("backColor=", backColor);

  if (backColor && backColor === 'red') {
    backImageSrc = `./Card_backs_grid_red.svg`;
  } else {
    backImageSrc = `./Card_backs_grid_blue.svg`;
  }
  return backImageSrc
}


export const generateJoker = (backColor) => {
  const imageSrc = `./${backColor}_joker.svg`;
  return { 'id': 0, 'rank': 'joker', 'suit': '', 'imageSrc': imageSrc, 'value': 25, 'backImageSrc': getBackImageSrc(backColor), 'faceUp': false, 'orderNo': 0 }
}

// Shuffle the deck using Fisher-Yates algorithm
export const shuffleDeck = async (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
}

// Deal cards to players
export const dealCard = (deck) => {
  return deck.pop();
}

// Deal cards to a player
export const dealCards = (deck, noCards, faceUp) => {
  if (deck.length > 0) {
    let hand = [];
    for (let i = 0; i < noCards; i++) {
      let c = dealCard(deck)
      if (c) {
        c.faceUp = faceUp;
        hand.push(c);
      }
    }
    return hand;
  }
}

export const generateRummyDeck = async () => {
  const blueDeck = await generateDeck('blue');
  const redDeck = await generateDeck('red');
  const redJoker = generateJoker('red');
  const redJoker2 = generateJoker('red');
  const blueJoker = generateJoker('black');
  const blueJoker2 = generateJoker('black');
  const tempDeck = blueDeck.concat(redDeck);
  tempDeck.push(redJoker);
  tempDeck.push(redJoker2);
  tempDeck.push(blueJoker);
  tempDeck.push(blueJoker2);
  // re-id them 
  //for (let i = 0, len = tempDeck.length; i < len; ++i) {
  for (let i = 0; i < tempDeck.length; i++) {
    tempDeck[i].id = i + 1;
  }
  return tempDeck;
}

export const dataTypeChecker = (data, debug = false) => {
  const log = console.log;
  let result = ``;
  const typeString = Object.prototype.toString.call(data);
  result = typeString.replace(/\[object /gi, ``).replace(/\]/gi, ``);
  if (debug) {
    log(`true type`, result)
  }
  return result;
};

export const areDifferentRanks = (cards) => {
  // Check if all cards have different ranks
  const ranks = new Set();

  for (const card of cards) {
    if (card.rank !== 'joker') {
      const rank = card.rank;
      if (ranks.has(rank)) {
        return false; // Not all cards have different ranks
      }
      ranks.add(rank);
    }
  }

  return true;
}

export const areDifferentSuits = (cards) => {
  // Check if all cards have different suits
  const suits = new Set();

  for (const card of cards) {
    if (card.rank !== 'joker') {
      const suit = card.suit;
      if (suits.has(suit)) {
        return false; // Not all cards have different suits
      }
      suits.add(suit);
    }
  }

  return true;
}

// same rank and different suits
export const isMeldSet = (cards) => {
  let result = true;
  if (cards.length === 1) {
    return true;
  }
  const jokerIndex = cards.findIndex((card) => { return card.rank === 'joker' });
  if (cards.length === 2 && jokerIndex !== -1) {
    return true;
  }

  if (!areDifferentSuits(cards)) {
    return false;
  }

  if (areDifferentRanks(cards)) {
    return false;
  }

  return result;
};

//'rank': 'joker'
// const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
//   const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
//deck.push({ 'id': id, 'rank': rank, 'suit': suit, 'imageSrc': imageSrc, 'value': value, 'backImageSrc': getBackImageSrc(backColor), 'faceUp': false });
export const isNextCardJokerReplacement = (cards, nextCard) => {
  // console.log('[isNextCardJokerReplacement] Before cards=', cards);
  // cards = sortRunWithJoker(cards);
  // console.log('[isNextCardJokerReplacement] AFter cards=', cards);
  const jokerIndex = cards.findIndex((card) => { return card.rank === 'joker' });
  if (cards.length >= 3 && jokerIndex !== -1) {

    let nextCardOrderNo = nextCard.orderNo;
    if (nextCard.rank === 'ace') {
      // could be 1 or 14
      const twoIndex = cards.findIndex((card) => { return card.rank === '2' });
      if (twoIndex !== -1) {
        nextCardOrderNo = 1;
      }
    }
    if (jokerIndex === 0) {
      if (nextCardOrderNo === cards[1].orderNo - 1) {
        return true;
      }
    } else if (jokerIndex > 0 && jokerIndex < cards.length - 1) {
      if (nextCardOrderNo > cards[jokerIndex - 1].orderNo
        && nextCardOrderNo < cards[jokerIndex + 1].orderNo) {
        return true;
      }
    } else if (jokerIndex === cards.length - 1) {
      if (nextCardOrderNo === cards[cards.length - 2].orderNo + 1) {
        return true;
      }
    }
  }

  return false;
}

// same suit and different ranks and ordered
export const isWholeGroupRuns = (existing, nextCard) => {
  let result = false;

  if (nextCard.rank === 'joker') {
    return true;
  }

  let twoIndex = existing.findIndex((card) => { return card.orderNo === 2 });
  let threeIndex = existing.findIndex((card) => { return card.orderNo === 3 });
  const queenIndex = existing.findIndex((card) => { return card.rank === 'queen' });
  const kingIndex = existing.findIndex((card) => { return card.rank === 'king' });
  let aceIndex = existing.findIndex((card) => { return card.rank === 'ace' });

  if (aceIndex !== -1) {
    // has ace
    if (queenIndex !== -1 || kingIndex !== -1) {
      // has queen or king
      if (nextCard.orderNo <= 6) {
        // reject small card
        return false;
      }
    }

    if (twoIndex !== -1 || threeIndex !== -1) {
      // has 2 or 3
      if (nextCard.orderNo >= 7) {
        // reject big card
        return false;
      }
    }
    // ace-joker accept next card to be 3
    if (nextCard.orderNo === 3) {
      return true;
    }
  }

  let cards = [...existing, nextCard];
  if (areDifferentSuits(cards)) {
    return false;
  }

  if (!areDifferentRanks(cards)) {
    return false;
  }

  // remove jokers
  const regularCards = cards.filter(card => card.rank !== 'joker');
  let noJokers = cards.length - regularCards.length;
  console.log('[isWholeGroupRuns] noJokers=', noJokers);
  // Sort the cards by suit and then by rank
  regularCards.sort((a, b) => {
    return a.orderNo - b.orderNo; // If suits are the same, sort by rank
  });

  twoIndex = regularCards.findIndex((card) => { return card.orderNo === 2 });
  threeIndex = regularCards.findIndex((card) => { return card.orderNo === 3 });
  aceIndex = regularCards.findIndex((card) => { return card.rank === 'ace' });

  for (let i = 0; i < regularCards.length; i++) {
    let current = regularCards[i];
    let next = null; // greater orderNo!
    if (i < regularCards.length - 1) {
      next = regularCards[i + 1];
    }
    console.log('[isWholeGroupRuns] current=', current);
    console.log('[isWholeGroupRuns] next=', next);
    if (next) {
      let nextOrderNo = next.orderNo;
      let currentOrderNo = current.orderNo;
      // joker can't cover distance
      const distance = nextOrderNo - currentOrderNo;
      if (aceIndex !== -1 && (twoIndex !== -1 || threeIndex !== -1)) {
        result = true;
      } else if (distance === 1) {
        result = true;
      } else {
        // need jokers (one joker covers distance of 2)!
        if (noJokers + 1 - distance >= 0) {
          result = true;
          if (noJokers > 0) {
            noJokers = noJokers + 1 - distance; // could use jokers only one time!
          }
        } else {
          return false;
        }
      }
    } else {
      result = true;
    }
  }
  return result;
}

export const sortCards = (cards) => {
  cards.sort((a, b) => {
    if (a.rank === 'joker') {
      return 1; // Jokers go to the end
    }
    if (b.rank === 'joker') {
      return -1; // Jokers go to the end
    }
    if (a.suit !== b.suit) {
      return a.suit.localeCompare(b.suit); // Sort by suit first
    }
    return a.orderNo - b.orderNo; // If suits are the same, sort by rank
  });
  return cards;
}

export const sortRunWithJoker = (cards) => {
  // Filter out the jokers
  const nonJokerCards = cards.filter(card => card.rank !== 'joker');

  // Sort the non-joker cards by rank
  nonJokerCards.sort((a, b) => a.orderNo - b.orderNo);

  // Find the index where a joker would be inserted
  let index = 0;
  for (let i = 0; i < nonJokerCards.length; i++) {
    if (nonJokerCards[i].orderNo <= cards[0].orderNo) {
      index = i + 1;
    } else {
      break;
    }
  }

  // Insert the jokers at the appropriate position
  const sortedRunWithJoker = [...nonJokerCards.slice(0, index), ...cards.filter(card => card.rank === 'joker'), ...nonJokerCards.slice(index)];

  return sortedRunWithJoker;
};

export const isNextCardValidForMeld = (cards, nextCard) => {
  // Clone the existing meld to avoid modifying the original array
  const meldWithNextCard = [...cards, nextCard];

  // Sort the meld with the next card by suit and then by rank
  sortCards(meldWithNextCard);

  // Check for a valid set or run
  const isSetOrRun = meldWithNextCard.every((card, index) => {
    if (card.rank === 'joker') {
      return true; // Jokers are always considered valid
    }

    if (index === 0) return true; // The first card is always part of a run or set

    // Check for a valid run or set (with or without jokers)
    const isSameSuit = card.suit === meldWithNextCard[index - 1].suit;
    const isConsecutiveRank = card.orderNo === meldWithNextCard[index - 1].orderNo + 1;

    return (isSameSuit && isConsecutiveRank) || card.orderNo === meldWithNextCard[index - 1].orderNo;
  });

  return isSetOrRun;
}

// Example usage:
// const currentMeld = [
//   { rank: 7, suit: 'hearts' },
//   { rank: 'joker' },
//   { rank: 9, suit: 'hearts' }
// ];

// const nextCard1 = { rank: 8, suit: 'hearts' };
// const nextCard2 = { rank: 'joker' };
// const nextCard3 = { rank: 10, suit: 'hearts' };

// console.log(isNextCardValidForMeld(currentMeld, nextCard1)); // Output: true (valid run with 8 added)
// console.log(isNextCardValidForMeld(currentMeld, nextCard2)); // Output: true (valid run with joker added)
// console.log(isNextCardValidForMeld(currentMeld, nextCard3)); // Output: false (not a valid run with 10 added)
