import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateTaskList from './components/CreateTaskList';
import Calendar from './components/Calendar';
import Stats from './components/Stats';
import Header from './components/Header';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

function App() {
  
  return (
      <div className="App">
        <Header/>
        
        <Switch>
          <Route component={Home} exact path="/"/>
          <ProtectedRoute component={CreateTaskList} path="/create-task-list"/>
          <ProtectedRoute component={Calendar} path="/calendar"/>
        </Switch>   
      </div>
  );
}

export default App;
