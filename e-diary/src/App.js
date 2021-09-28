import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import AddEntry from './components/AddEntry/AddEntry';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ViewDiary from './components/ViewDiary/ViewDiary';
import EditEntry from './components/EditEntry/EditEntry';

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/editEntry/:id" component={EditEntry} />
          <Route path="/viewDiary/:id" component={ViewDiary} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/addEntry" component={AddEntry} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
