import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateTaskList from './components/CreateTaskList';
import Calendar from './components/Calendar';
import Stats from './components/Stats';
import Header from './components/Header';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import TaskscompletedState from './context/TaskscompletedState';

function App() {
  
  return (
      <div className="App">
        <Router>
          <Header/>
          <Switch>
            <Route component={Home} exact path="/"/>
            <ProtectedRoute component={CreateTaskList} path="/create-task-list"/>
            <ProtectedRoute component={Calendar} path="/calendar"/>
            <ProtectedRoute component={Stats} path='/stats'/>
          </Switch>
        </Router>        
      </div>
  );
}

export default App;
