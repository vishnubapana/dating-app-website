import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Route } from "react-router";
import NavigationBarDashboard from "../NavigationBarDashboard"
import EditProfile from '../EditProfile'
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
    const history = useHistory();
    function onEdit(e) {
        console.log(e.target.value);
        
        history.push('/editProfile', {
            edit_id: e.target_valuse
          })
    }

    return (
        <>
            <NavigationBarDashboard/>
            {people.map((person) => (
                <div key={person._id} className = "thisbody">
                    <div className = "column">
                        <div className = "rowlen">
                            <div className="card" style={{backgroundImage: `url(${person.profileImgUrl})`}}>
                                <h3 className="h3">{person.name}</h3>
                                <Link key ={person._id} to='/editProfile' className="btn btn-primary b1" >Edit</Link>
                                <Link to="/userprofile" className="btn btn-primary b2">Delete</Link>
                            </div>
                        </div>
                    </div>
                </div>
                
            ))}
        </>
    )
}

export default AdminDashboard;