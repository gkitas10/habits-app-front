import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import CreateTaskList from './components/CreateTaskList';
import Calendar from './components/Calendar';
import Stats from './components/Stats';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


function App() {
  
  return (
      <div className="App">
        <Router>
          <Header/>
          <Switch>
            <ProtectedRoute component={CreateTaskList} path="/create-task-scheme"/>
            <ProtectedRoute component={Calendar} path="/calendar"/>
            <ProtectedRoute component={Stats} path='/stats'/>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
