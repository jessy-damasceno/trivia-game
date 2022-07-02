import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import Trivia from './pages/Game';
import FeedBack from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" render={ (props) => <Login { ...props } /> } />
      <Route exact path="/trivia" render={ (props) => <Trivia { ...props } /> } />
      <Route exact path="/settings" render={ (props) => <Settings { ...props } /> } />
      <Route exact path="/feedback" render={ (props) => <FeedBack { ...props } /> } />
      <Route exact path="/ranking" render={ (props) => <Ranking { ...props } /> } />
    </Switch>
  );
}
