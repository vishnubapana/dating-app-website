import React, { useState, useEffect } from 'react'
import {Link, useHistory} from 'react-router-dom'
import { Route } from "react-router";
import NavigationBarDashboard from "../NavigationBarDashboard"
import EditProfile from '../EditProfile'
import TinderCards from '../tinderCards/TinderCards'
import SwipeButtons from '../swipeButtons/SwipeButtons'
<<<<<<< HEAD
import { makeStyles } from '@material-ui/core/styles';
// import "./admin.css"
=======
import "./admin.css"
>>>>>>> 8edd4021e84016fb14ec15681a22c045f42ba19f
import axios from "axios"
import {
    Grid,
    Card,
    CardContent,
    Button,
    CardHeader,
    Box,
    CardMedia
  } from "@material-ui/core/";
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2)
    }
  }));



export function getCards() {
    return fetch('http://localhost:8000/api/users')
      .then(data => data.json())
  }

const AdminDashboard = () => {
    const classes = useStyles();
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
<<<<<<< HEAD
            {/* {people.map((person) => (
                <div key={person._id}>
=======
            {people.map((person) => (
                <div key={person._id} className = "thisbody">
>>>>>>> 8edd4021e84016fb14ec15681a22c045f42ba19f
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
                
            ))} */}


<div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {people.map((person) => (
            <Grid item xs={4} key={person._id}>
              <Card>
                <CardHeader
                  title={`Name : ${person.name}`}
                  subheader={`Bio : ${person.bio}`}
                />
                <CardContent>
                  <CardMedia
                    component="img"
                    className='mediastyle'
                    image={person.profileImgUrl}
                    height="200px"
                    width="500px"
                  />
                  <br></br>

                  <Box align='center' display="flex" justifyContent="space-between">
                    <Button
                      color='primary'
                      size='large'
                      variant='contained'
                    >
                      Edit Profile
    </Button>
                    <Button
                      color='primary'
                      size='large'
                      variant='contained'
                    >
                      Delete
    </Button></Box>

                </CardContent>

              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
        </>
    )
}

export default AdminDashboard;