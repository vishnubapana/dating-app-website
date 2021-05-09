import './App.css';
import {useState, useEffect} from 'react'
import NavigationBar from './components/js/NavigationBar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SignIn from './components/js/SignIn'
import SignUp from './components/js/SignUp';
import Dashboard from './components/js/Dashboard';
import Logout from './components/js/Logout';
import PublicRoute from './components/utils/PublicRoute';
import PrivateRoute from './components/utils/PrivateRoute';
import EditProfile from './components/js/EditProfile';
import MyProfile from './components/js/MyProfile';
import Matches from './components/js/Matches';
import { getUser } from './components/utils/Common';
import Footer from './components/js/footer/Footer'
import HeroSection from './components/js/herosection/HeroSection';

 // GET USER INFORMATION FROM DATABASE SHOWING 1 FOR TRUE AND 0 FOR FALSE

function App(token) {


  const [isAdmin, setIsAdmin] = useState();


  useEffect(() => {
    if(getUser() != null){
      setIsAdmin(getUser().isAdmin)
    }
    

  }, [isAdmin])


  return (
    <Router>
      <Switch>
        <Route path='/' exact >
          <NavigationBar/>
          <HeroSection />
          <Footer />
        </Route>
        <PublicRoute path='/sign-in' component={SignIn}/>
        <Route path='/sign-up' component={SignUp}/>
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path='/userprofile' component={MyProfile}/>
        <PrivateRoute path='/editprofile' component={EditProfile}/>
        <PrivateRoute path='/mymatches' component={Matches}/>
        <PrivateRoute path='/logout' component={Logout}/>
      </Switch>
    </Router>
  );
}

export default App;
