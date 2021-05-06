import './App.css';
import NavigationBar from './components/js/NavigationBar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
      <NavigationBar/>
      <Switch>
        <Route path='/' exact />
      </Switch>
    </Router>
    </>
  );
}

export default App;
