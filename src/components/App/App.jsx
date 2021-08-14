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
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function handleServerErorr(err) {
    setServerErrorMessage(err);
  }

  function resetServerErorr() {
    setServerErrorMessage('');
  }

  function handleRegister(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then(() => {
        history.push('/signin');
      })
      .catch((err) => {
        handleServerErorr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        checkUserToken();
        history.push('/movies');
      })
      .catch((err) => {
        handleServerErorr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function checkUserToken() {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push('/movies');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .editProfile({ name, email })
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        handleServerErorr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }

  useEffect(() => {
    if(loggedIn) {
    mainApi
      .loadUserInfo()
      .then(({ name, email }) => {
        setCurrentUser({ name, email });
      })
      .catch((err) => {
        handleServerErorr(err);
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    checkUserToken();
  }, []);

  const MoviesContent = ({ loggedIn }) => (
    <>
      <Header loggedIn={loggedIn} />
      <Movies />
      <Footer />
    </>
  );
  
  const SavedMoviesContent = ({ loggedIn }) => (
    <>
      <Header loggedIn={loggedIn} />
      <SavedMovies />
      <Footer />
    </>
  );
  
  const ProfileContent = ({
    loggedIn,
    handleLogOut,
    handleUpdateUser,
    isLoading,
    serverErrorMessage,
    resetServerErorr
  }) => (
    <>
      <Header loggedIn={loggedIn} />
      <Profile
        handleLogOut={handleLogOut}
        handleUpdateUser={handleUpdateUser}
        isLoading={isLoading}
        serverErrorMessage={serverErrorMessage}
        resetServerErorr={resetServerErorr}
      />
    </>
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path='/'>
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>

          <ProtectedRoute
            path='/movies'
            exact
            component={MoviesContent}
            loggedIn={loggedIn}
          />

          <ProtectedRoute
            path='/saved-movies'
            exact
            component={SavedMoviesContent}
            loggedIn={loggedIn}
          />

          <ProtectedRoute
            path='/profile'
            exact
            component={ProfileContent}
            handleLogOut={handleLogOut}
            handleUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            loggedIn={loggedIn}
            serverErrorMessage={serverErrorMessage}
            resetServerErorr={resetServerErorr}
          />

          <Route path='/signup'>
            <Register 
              onRegister={handleRegister} 
              isLoading={isLoading} 
              serverErrorMessage={serverErrorMessage} 
              resetServerErorr={resetServerErorr}
            />
          </Route>

          <Route path='/signin'>
            <Login
              onLogin={handleLogin}
              isLoading={isLoading}
              loggedIn={loggedIn}
              serverErrorMessage={serverErrorMessage}
              resetServerErorr={resetServerErorr}
            />
          </Route>

          <Route path='/*'>
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
