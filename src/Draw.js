import React, { useEffect, useState } from "react";
import axios from "axios";
const BASE_URL = "https://deckofcardsapi.com/api/deck";

function Draw() {
  const [deckId, setDeckId] = useState();
  const [card, setCard] = useState();
  const [cardImg, setCardImg] = useState();
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter((counter) => counter + 1);
  };

  // GET and set state of deckId on page load
  useEffect(() => {
    async function getDeck() {
      let res = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);
      setDeckId(res.data.deck_id);
    }
    getDeck();
  }, [setDeckId]);

  // GET card from deck
  useEffect(() => {
    async function drawCard() {
      let res = await axios.get(`${BASE_URL}/${deckId}/draw/?count=1`);
      setCard(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
      setCardImg(res.data.cards[0].image);
    }
    drawCard();
  }, [setCard, setCardImg, counter]);

  return (
    <div>
      <p>deckId is {deckId}</p>
      <p>card is {card}</p>
      <p>cardImg is {cardImg}</p>
      <img src={cardImg}></img>
      <p>counter is {counter}</p>
      <button onClick={increment}>Draw</button>
    </div>
  );
}

export default Draw;

// using counter? for onClick, how to handle onClick in general
// handle empty deck? (maybe with api's "remaining?")
// try/catch, "cleanup"
