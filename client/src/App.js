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
import { getUser } from './components/utils/Common';
import UserProfile from './components/js/UserProfile';
import EditProfile from './components/js/EditProfile';
import MyProfile from './components/js/MyProfile';
import AdminDashboard from './components/js/adminDashboard/AdminDashboard';

 // GET USER INFORMATION FROM DATABASE SHOWING 1 FOR TRUE AND 0 FOR FALSE

function App(token) {

  const [authLoading, setAuthLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(true);


  /*useEffect(() => {
    setIsAdmin(getUser().isAdmin)

  }, [])*/
  // if(authLoading && getToken()){
  //   return <div className="content">Checking Authentication...</div>
  // }

  // useEffect(() => {
  //   const token = getToken();
  //   if(!token){
  //     return;
  //   }
  // }, [input])


  return (
    <Router>
      <Switch>
        <Route path='/' exact >
          <NavigationBar/>
        </Route>
        <PublicRoute path='/sign-in' component={SignIn}/>
        <Route path='/sign-up' component={SignUp}/>
        <PrivateRoute path='/dashboard' component={isAdmin ? AdminDashboard: Dashboard}/>
        <PrivateRoute path='/userprofile' component={MyProfile}/>
        <PrivateRoute path='/editprofile' component={EditProfile}/>
        <PrivateRoute path='/logout' component={Logout}/>
      </Switch>
    </Router>
  );
}

export default App;
// export default withRouter(App);
