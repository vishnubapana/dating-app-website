import React, { useState, useEffect } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";


export function getCards() {
  return fetch('http://localhost:8000/api/tindercards')
    .then(data => data.json())
}

const TinderCards = () => {
  const [people, setPeople] = useState([]);

  

  useEffect(() => {
    let mounted = true;
   getCards()
     .then(items => {
       if(mounted) {
        setPeople(items.user)
        console.log(people)
       }
     })
   return () => mounted = false;
 }, []);


 const onSwipe = (direction) => {
  console.log('You swiped: ' + direction)
}
 
const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + ' left the screen')
}

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            key={person.name}
            className="swipe"
            preventSwipe={["up", "down"]}
            onSwipe={onSwipe} 
            onCardLeftScreen={() => onCardLeftScreen('fooBar')}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card"
            >
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
    </div>
  );
};

export default TinderCards;
