import React, { useState, useEffect, useRef } from "react";
import { generateDeck, shuffleDeck, dealCard, generateJoker } from "../utils/helpers";
import styled, { ThemeContext } from 'styled-components'
import PlayingCard from "./PlayingCard"
import Deck from './Deck'

const PlayingTable = () => {
    console.log('Render PlayingTable');
    // const theme = useContext(ThemeContext)
    // const isMobile = useMedia([theme.max('sm')])

    const [deck, setDeck] = useState([])
    const [hand, setHand] = useState([])
    let images = require.context('../images', true);
    useEffect(() => {
        console.log('useEffect');
        const blueDeck = generateDeck({ 'backColor': 'blue' });
        const redDeck = generateDeck({ 'backColor': 'red' });
        const redJoker = generateJoker({ 'backColor': 'red' });
        const redJoker2 = generateJoker({ 'backColor': 'red' });
        const blueJoker = generateJoker({ 'backColor': 'black' });
        const blueJoker2 = generateJoker({ 'backColor': 'black' });
        const tempDeck = blueDeck.concat(redDeck);
        tempDeck.push(redJoker);
        tempDeck.push(redJoker2);
        tempDeck.push(blueJoker);
        tempDeck.push(blueJoker2);
        // re-id them
        for (var i = 0, len = tempDeck.length; i < len; ++i) {
            tempDeck[i].id = i;
        }

        setDeck(tempDeck);
    }, [])

    useEffect(() => {
        console.log('useEffect2');
        if (deck.length > 0) {
            shuffleDeck(deck);
        }

    }, [deck])

    useEffect(() => {
        console.log('useEffect3');
        if (deck.length > 0) {
            let player1 = [];
            for (let i = 0; i < 15; i++) {
                const c = dealCard(deck)
                console.log('dealCard=', c);
                player1.push(c);
                console.log('player1=', player1);
            }
            console.log('AFTER for loop player1=', player1);
            setHand(player1);
            console.log('hand=', hand);
        }
    }, [deck])

    // { id, rank, suit, imageSrc, value }
    const width = '40px'

    return (
        <div>
            <h1>Playing Table</h1>
            <div>Top player cards</div>

            <Deck xoffset="200" yoffset="100"/>



            <div style={{ display: 'flex', marginTop: "80px" }}>
                {hand.length > 0 && hand.map((card, index) => {
                    // return (<span>Card: {card.id}</span>)
                    // return (<img key={card.id} src={images(card.imageSrc)} width={width} alt={card.imageSrc} />)
                    return (<PlayingCard key={card.id} card={card} xoffset={100 + index * 20} />)
                    // return (images(card.imageSrc))
                })}
            </div>
        </div>
    );
};

export default PlayingTable;