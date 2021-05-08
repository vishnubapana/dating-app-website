import './App.css';
import {useState} from 'react'
import NavigationBar from './components/js/NavigationBar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SignIn from './components/js/SignIn'
import SignUp from './components/js/SignUp';
import Dashboard from './components/js/Dashboard';
import Logout from './components/js/Logout';
import PublicRoute from './components/utils/PublicRoute';
import PrivateRoute from './components/utils/PrivateRoute';
import { getToken } from './components/utils/Common';
import UserProfile from './components/js/UserProfile';

function App() {

  const [authLoading, setAuthLoading] = useState(true);

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
        <PrivateRoute path='/dashboard' component={Dashboard}/>
        <PrivateRoute path='/userprofile' component={UserProfile}/>
        <PrivateRoute path='/logout' component={Logout}/>
      </Switch>
    </Router>
  );
}

export default App;
// export default withRouter(App);
