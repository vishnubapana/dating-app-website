import React, { useState } from "react";
import "./TinderCards.css";
import TinderCard from "react-tinder-card";


const TinderCards = () => {
  const [people, setPeople] = useState([
    {
      url: "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      name: "ABC"
    },
    {
      url: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80",
      name: "sfsa"
    }
  ]);

  // useEffect(() => {
  //   const unsubscribe = database.collection("people").onSnapshot((snapshot) => {
  //     setPeople(snapshot.docs?.map((doc) => doc.data()));
  //   });

  //   return () => {
  //     // This is cleanup...
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {people.map((person) => (
          <TinderCard
            key={person.name}
            className="swipe"
            preventSwipe={["up", "down"]}
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
