import React, { useState, useEffect } from 'react'
import NavigationBarWithSearch from './NavigationBarWithSearch'
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import '../css/matches.css'
import { getUser } from '../utils/Common';
import './cards/Cards.css'
import CardItem from './cards/CardItem';
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
  },

  color: {
    backgroundColor: '#fff',
    color: '#7b7b7b'
    }

}));



export function getMatches() {
  var _id = getUser()._id;
  return fetch('http://localhost:8000/api/matches/' + _id)
    .then(data => data.json())
}

const Matches = () => {

  const handleInput = (e) => {
    console.log(e.target.value)
    let filteredData = people.filter((person) => {
      return person.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setFilteredPeople(filteredData)
  }


  const handleUnmatch = (id) => {
    // console.log("Handle unmatch called "+id)
    return fetch('http://localhost:8000/api/unmatch', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "idfrom": String(getUser()._id),
      "idto": String(id)
  })
  })
    .then(data => data.json())
    .then((data) => {
      console.log("Response is "+data.message)
    })
    .catch((error) => {
      console.log("Error "+error)
    })
  }

  const classes = useStyles();

  const [people, setPeople] = useState([])
  const [filteredPeople, setFilteredPeople] = useState([])
  useEffect(() => {
    let mounted = true;
    getMatches()
      .then(items => {
        if (mounted) {
          setPeople(items.user)
          setFilteredPeople(items.user)
        }
      })
    return () => mounted = false;
  }, [people]);

  return (
    <>
      <NavigationBarWithSearch handleInput={handleInput}/>
      <ul className='cards__items'>
      <Grid
          container
          spacing={3}
          
        >
      {filteredPeople.map((person) => (
        <Grid item xs={4} key={person.id}>
          <Card>
            <CardItem
            src={person.url}
            text={person.bio}
            label={person.name}
          />
          <Box align='center' display="flex" justifyContent="space-between">
                    <Button
                      size='large'
                      color='primary'
                      onClick={() => handleUnmatch(person.id)}
                    >
                      Unmatch
    </Button>
                    <Button
                      size='large'
                      color='primary'
                    >
                      Chat
    </Button></Box>
    </Card>
          </Grid>
      ))}
      </Grid>
          </ul>
      
    </>
  )

}
export default Matches;
