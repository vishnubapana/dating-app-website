import React, { useState, useEffect } from 'react'
import NavigationBarWithSearch from './NavigationBarWithSearch'
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import '../css/matches.css'
import { Link, useHistory } from 'react-router-dom'
import { getUser } from '../utils/Common';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Box
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2)
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
  }, []);

  return (
    // <div>
    // <NavigationBarDashboard />
    //       <Typography classname='headingstyle' gutterBottom variant="h3" component="h2">Matches</Typography>
    //   {people.map((person) => (    
    //     <div class='inlinepurpose'>
    //   <Card 
    //   className='rootstyle'
    //   >
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       className='mediastyle'
    //       image={person.url}
    //       height="100%"
    //     />
    //     <CardContent>
    //       <Typography gutterBottom variant="h5" component="h2">
    //         {person.name}
    //       </Typography>
    //       <Typography variant="body2" color="textSecondary" component="p">
    //         {person.bio}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    //   <CardActions>
    //     <Button size="small" color="primary">
    //       Unmatch
    //     </Button>
    //     <Button size="small" color="primary">
    //       Chat
    //     </Button>
    //   </CardActions>
    // </Card>
    // </div>
    // ))}
    // </div> 

    <>
      <NavigationBarWithSearch handleInput={handleInput}/>
      <div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {filteredPeople.map((person) => (
            <Grid item xs={4} key={person.name}>
              <Card>
                <CardHeader
                  title={`Name : ${person.name}`}
                  subheader={`Bio : ${person.bio}`}
                />
                <CardContent>
                  <CardMedia
                    component="img"
                    className='mediastyle'
                    image={person.url}
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
                      Unmatch
    </Button>
                    <Button
                      color='primary'
                      size='large'
                      variant='contained'
                    >
                      Chat
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
export default Matches;
