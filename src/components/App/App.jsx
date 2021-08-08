import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register'
import Login from '../Login/Login';
import Navigation from '../Navigation/Navigation';

function App() {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  function toggleNavMenu() {
    setIsNavMenuOpen(!isNavMenuOpen);
  }

  //function openNavMenu() {
  // setIsNavMenuOpen(true);
  //}

  //function closeNavMenu() {
  // setIsNavMenuOpen(false);
  //}

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header loggedIn={false} onNavMenuActive={isNavMenuOpen} />
          <Main />
          <Footer />
        </Route>

        <Route path="/movies">
          <Header loggedIn={true} onNavMenuActive={isNavMenuOpen} />
          <Movies />
          <Footer />
        </Route>

        <Route path="/saved-movies">
          <Header loggedIn={true} onNavMenuActive={isNavMenuOpen} />
          <SavedMovies />
          <Footer />
        </Route>

        <Route path="/profile">
          <Header loggedIn={true} />
          <Profile />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>

        <Route path="/*">
          <Navigation isOpen={isNavMenuOpen} onClose={toggleNavMenu} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
