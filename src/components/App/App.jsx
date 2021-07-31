import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

//import Header from '../Header/Header';
//import Main from '../Main/Main';
//import Movies from '../Movies/Movies';
//import SavedMovies from '../SavedMovies/SavedMovies';
//import Profile from '../Profile/Profile';
//import Footer from '../Footer/Footer';
//import Register from '../Register/Register';
//import Login from '../Login/Login';
//import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
    return (
        <>
            <div className='page'>
                <Switch>
                    <Route path='/' exact>

                    </Route>

                    <Route path='/movies'>

                    </Route>

                    <Route path='/saved-movies'>

                    </Route>

                    <Route path='/profile'>

                    </Route>

                    <Route path='/signup'>

                    </Route>

                    <Route path='/signin'>

                    </Route>

                    <Route path='/*'>

                    </Route>
                </Switch>
            </div>
        </>
    );
}
export default App;