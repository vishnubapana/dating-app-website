import React, { useState, useEffect } from 'react'
import NavigationBarDashboard from './NavigationBarDashboard'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../css/matches.css'
import {Link, useHistory} from 'react-router-dom'
import { getUser } from '../utils/Common';



  export function getMatches() {
    var _id = getUser()._id;
    return fetch('http://localhost:8000/api/matches/'+_id)
      .then(data => data.json())
  }

  const Matches = () => {
    const [people, setPeople] = useState([])
    useEffect(() => {
        let mounted = true;
       getMatches()
         .then(items => {
           if(mounted) {
            setPeople(items.user)
           }
         })
       return () => mounted = false;
     }, []);

        return(
    <div>
    <NavigationBarDashboard />
          <Typography classname='headingstyle' gutterBottom variant="h3" component="h2">Matches</Typography>
      {people.map((person) => (    
        <div class='inlinepurpose'>
      <Card 
      className='rootstyle'
      >
      <CardActionArea>
        <CardMedia
          component="img"
          className='mediastyle'
          image={person.url}
          height="100%"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {person.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {person.bio}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Unmatch
        </Button>
        <Button size="small" color="primary">
          Chat
        </Button>
      </CardActions>
    </Card>
    </div>
    ))}
    </div> 
  
        )
    
}

export default Matches;
