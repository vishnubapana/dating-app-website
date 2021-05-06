import './App.css';
import NavigationBar from './components/js/NavigationBar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import SignIn from './components/js/SignIn'
import SignUp from './components/js/SignUp';

function App() {
  return (
    <>
    <Router>
      <NavigationBar/>
      <Switch>
        <Route path='/' exact />
        <Route path='/sign-in'>
          <SignIn/>
        </Route>
        <Route path='/sign-up'>
          <SignUp/>
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
