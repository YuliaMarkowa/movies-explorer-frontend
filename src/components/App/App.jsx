import './App.css';
import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import auth from '../../utils/auth';
import mainApi from '../../utils/MainApi';
import { setLocalStorage } from '../helpers/helperLocalStorage';
import { SUCCESS_MESSAGE } from '../helpers/constants';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [successText, setSuccessText] = useState('');
  const [isCheckUserToken, setIsCheckUserToken] = useState(true);

  function handleServerErorr(err) {
    setServerErrorMessage(err);
  }

  function resetServerErorr() {
    setServerErrorMessage('');
  }

  function handleRegister({name, email, password}) {
    setIsLoading(true);
    auth
      .register({name, email, password})
      .then(() => {
        handleLogin({email, password});
      })
      .catch((err) => {
        handleServerErorr(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin({email, password}) {
    setIsLoading(true);
    auth
      .authorize({email, password})
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
          }
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      setIsCheckUserToken(false);
    }
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .editProfile({ name, email })
      .then((user) => {
        setCurrentUser(user);
        setSuccessText(SUCCESS_MESSAGE)
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
        Promise.all([mainApi.loadUserInfo(), mainApi.getSaveMoviesCards()])
        .then(([userInfo, moviesSaved])=> {
            setCurrentUser(userInfo);
            setIsCheckUserToken(false);
            if (moviesSaved) {
                const filterMovies = moviesSaved.filter(({owner})=> owner === userInfo._id)
                const deletedDublicate = filterMovies.filter((set => ({nameRU}) => !set.has(nameRU) && set.add(nameRU))(new Set()));
                setLocalStorage('savedMovies', deletedDublicate)
            }
        })
        .catch((err) => {
            handleServerErorr(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    checkUserToken();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setSuccessText('');
     }, 2000);
   },[successText]);

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
    resetServerErorr,
    successText
  }) => (
    <>
      <Header loggedIn={loggedIn} />
      <Profile
        handleLogOut={handleLogOut}
        handleUpdateUser={handleUpdateUser}
        isLoading={isLoading}
        serverErrorMessage={serverErrorMessage}
        resetServerErorr={resetServerErorr}
        successText={successText}
      />
    </>
  );

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      {isCheckUserToken ? (
        <Preloader />
      ) : (
        <Switch>
          <Route exact path='/'>
            <Header loggedIn={loggedIn} />
            <Main />
            <Footer />
          </Route>

          <ProtectedRoute
            path='/movies'
            loggedIn={loggedIn}
            component={MoviesContent}
          />

          <ProtectedRoute
            path='/saved-movies'
            loggedIn={loggedIn}
            component={SavedMoviesContent}
          />

          <ProtectedRoute
            path='/profile'
            loggedIn={loggedIn}
            component={ProfileContent}
            handleLogOut={handleLogOut}
            handleUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            serverErrorMessage={serverErrorMessage}
            resetServerErorr={resetServerErorr}
            successText={successText}
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
  )}
  </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
