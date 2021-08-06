import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { getAllMovies } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/MoviesUtils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';
import './App.css';
import {
  deleteMovie,
  getSavedMovies,
  getUser,
  register,
  saveMovie,
  signin,
  signout,
} from '../../utils/MainApi';

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = useState(null)
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [movies, setMovies] = useState(null);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (name, email, password) => {
    register(name, email, password)
      .then(() => {
        handleSignin(email, password);
      })
      .catch((err) => console.log(err));
  }

  const handleTokenCheck = () => {
    Promise.all([
      getUser(),
      getSavedMovies()
    ])
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  }

  const handleSignin = (email, password) => {
    signin(email, password)
      .then(() => handleTokenCheck())
      .then(() => history.push('/movies'))
      .catch((err) => console.log(err));
  }

  const handleSignout = () => {
    signout()
      .then(() => {
        localStorage.removeItem('movies');
        setMovies([]);
        setSavedMovies([])
        setCurrentUser(null);
      })
      .catch((err) => console.log(err));
  }

  const closeAllPopups = () => {
    setIsNavigationPopupOpen(false);
  }

  const handleNavigationClick = () => setIsNavigationPopupOpen(true);

  const handleSearchSubmit = (searchValue, isChecked) => {
    setIsLoading(true);
    getAllMovies()
      .then((res) => {
        const filteredMovies = filterMovies(res, searchValue, isChecked);

        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        setMovies(filteredMovies);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  const handleClickMovie = (movie, isSaved) => {
    if (isSaved) {
      const movieId = movie._id
        || savedMovies.find((item) => item.id === movie.id)._id;

      return deleteMovie(movieId)
        .then(() =>
          setSavedMovies((state) =>
            state.filter((item) =>
              item._id !== movieId)))
        .catch((err) => console.log(err));
    }

    return saveMovie(movie)
      .then((res) => {
        setSavedMovies([res, ...savedMovies])
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (!movies) {
      const localMovies = JSON.parse(localStorage.getItem('movies'));
      localMovies && setMovies(localMovies);
    }
  }, [movies])

  useEffect(() => {
    handleTokenCheck();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header
              onMenuClick={handleNavigationClick}
            />
            <Main />
            <Footer />
          </Route>

          <ProtectedRoute exact path="/movies">
            <Header
              onMenuClick={handleNavigationClick}
            />
            <Movies
              movies={movies}
              savedMovies={savedMovies}
              handleSearchSubmit={handleSearchSubmit}
              onClick={handleClickMovie}
              isLoading={isLoading}
            />
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute exact path="/saved-movies">
            <Header
              onMenuClick={handleNavigationClick}
            />
            <SavedMovies
              movies={savedMovies}
              onClick={handleClickMovie}
            />
            <Footer />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile">
            <Header
              onMenuClick={handleNavigationClick}
            />
            <Profile onLogout={handleSignout} userData={currentUser}/>
          </ProtectedRoute>

          <Route exact path="/register">
            {!currentUser
              ? <Register onRegister={handleRegister} />
              : <Redirect to="/movies" />
            }
          </Route>

          <Route exact path="/login">
            {!currentUser
              ? <Login onLogin={handleSignin} />
              : <Redirect to="/movies" />
            }
          </Route>

          <Route>
            <NotFound />
          </Route>
        </Switch>

        {currentUser && <Popup isOpen={isNavigationPopupOpen} onClose={closeAllPopups} />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
