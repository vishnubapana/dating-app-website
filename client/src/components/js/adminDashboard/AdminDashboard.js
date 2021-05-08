import React, { useState, useEffect } from 'react'
import NavigationBarDashboard from "../NavigationBarDashboard"
import TinderCards from '../tinderCards/TinderCards'
import SwipeButtons from '../swipeButtons/SwipeButtons'
import "./admin.css"
import axios from "axios"


export function getCards() {
    return fetch('http://localhost:8000/api/tindercards')
      .then(data => data.json())
}

const AdminDashboard = () => {
    const [people, setPeople] = useState([]);

    useEffect(() => {
        let mounted = true;
       getCards().then(items => {
           if(mounted) {
            setPeople(items.user)
            console.log(people)
           }
         })
       return () => mounted = false;
     }, []);

    return (
        <>
            <NavigationBarDashboard />
            <div class="row">
                <div class="column">
                    <div class="card">
                        <img></img>
                        <h3>Name</h3>
                    </div>
                </div>
                <div class="column">
                    <div class="card">
                        <img></img>
                        <h3>Name</h3>
                    </div>
                </div><div class="column">
                    <div class="card">
                        <img></img>
                        <h3>Name</h3>
                    </div>
                </div><div class="column">
                    <div class="card">
                        <img></img>
                        <h3>Name</h3>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboard;
