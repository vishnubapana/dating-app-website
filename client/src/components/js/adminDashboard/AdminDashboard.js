import React, { useState, useEffect } from 'react'
import NavigationBarDashboard from "../NavigationBarDashboard"
import TinderCards from '../tinderCards/TinderCards'
import SwipeButtons from '../swipeButtons/SwipeButtons'
import "./admin.css"
import axios from "axios"



export function getCards() {
    return fetch('http://localhost:8000/api/users')
      .then(data => data.json())
  }

const AdminDashboard = () => {
    const [people, setPeople] = useState([])
    useEffect(() => {
        let mounted = true;
       getCards()
         .then(items => {
           if(mounted) {
            setPeople(items.user)
           }
         })
       return () => mounted = false;
     }, []);

    return (
        <>
            <NavigationBarDashboard/>
            {people.map((person) => (
                <div key={person._id}>
                    <div className = "column">
                        <div>
                            <div className="card" style={{backgroundImage: `url(${person.profileImgUrl})`}}>
                                <h3>{person.name}</h3>
                                <button className = "b1">edit</button>
                                <button className = "b2">delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            ))}
        </>
    )
}

export default AdminDashboard;