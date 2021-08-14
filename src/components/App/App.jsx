import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import auth from '../../utils/auth';
import mainApi from '../../utils/MainApi';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register'
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage'

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});

  function handleRegister(name, email, password) {
    auth
      .register(name, email, password)
      .then(() => {
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        checkUserToken();
        history.push("/movies");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
      mainApi
        .loadUserInfo()
        .then(({ name, email }) => {
          setCurrentUser({ name, email });
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  function handleUpdateUser({ name, email }) {
    mainApi
      .editProfile({ name, email })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogOut() {
    localStorage.clear();
    history.push("/");
  }

  function checkUserToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          console.log(res);
          if (res) {
            history.push("/movies");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  useEffect(() => {
    checkUserToken();
  }, []);
  
  
   

  return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header loggedIn={false} />
          <Main />
          <Footer />
        </Route>

        <Route path="/movies">
          <Header loggedIn={true} />
          <Movies />
          <Footer />
        </Route>

        <Route path="/saved-movies">
          <Header loggedIn={true} />
          <SavedMovies />
          <Footer />
        </Route>

        <Route path="/profile">
          <Header loggedIn={true} />
          <Profile onSignOut={handleLogOut} onUpdateUser={handleUpdateUser}/>
        </Route>

        <Route path="/signup">
          <Register
          onRegister={handleRegister}
          />
        </Route>

        <Route path="/signin">
          <Login
          onLogin={handleLogin}
          
          />
        </Route>

        <Route path="/*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  </CurrentUserContext.Provider>
  );
};

export default App;
