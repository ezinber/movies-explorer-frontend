import { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { getAllMovies } from '../../utils/MoviesApi';
import { filterMoviesByName } from '../../utils/MoviesUtils';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import {
  ResponseMessageContext,
  responseErrorMessages,
  responseSuccessMessages,
} from '../../contexts/ResponseMessageContext';
import ProtectedRoute from '../../hocs/ProtectedRoute';
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
import {
  deleteMovie,
  getSavedMovies,
  getUser,
  register,
  saveMovie,
  signin,
  signout,
  updateUser,
} from '../../utils/MainApi';
import './App.css';
import Preloader from '../Preloader/Preloader';

function App() {
  const {
    incorrectDataMessage,
    sameEmailMessage,
    incorrectCredentialsMessage,
    somethingWentWrong,
  } = responseErrorMessages;
  const {
    successUpdateMessage
  } = responseSuccessMessages;

  const [currentUser, setCurrentUser] = useState(null);
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);

  const history = useHistory();

  const getDataFromStorage = () => {
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    const lastSearch = localStorage.getItem('lastSearch') || '';

    return {localMovies, lastSearch};
  }

  const handleTokenCheck = () => {
    setIsChecking(true);
    Promise.all([
      getUser(),
      getSavedMovies()
    ])
      .then(([user, movies]) => {
        setCurrentUser(user);
        setSavedMovies(movies);
      })
      .catch(() => console.log('Необходима авторизация'))
      .finally(() => {
        setIsChecking(false);
      });
  }

  const handleRegister = (name, email, password) => {
    setIsLoading(true);
    register(name, email, password)
      .then(() => {
        handleSignin(email, password);
        responseMessage && setResponseMessage(null);
      })
      .catch((err) => {
        if (err === 400) {
          return setResponseMessage(incorrectDataMessage);
        }
        if (err === 409) {
          return setResponseMessage(sameEmailMessage);
        }
        return setResponseMessage(somethingWentWrong);
      })
      .finally(() => setIsLoading(false));
  }

  const handleSignin = (email, password) => {
    setIsLoading(true);
    signin(email, password)
      .then(() => {
        responseMessage && setResponseMessage(null);
        return handleTokenCheck();
      })
      .then(() => history.push('/movies'))
      .catch((err) => {
        if (err === 400) {
          return setResponseMessage(incorrectDataMessage);
        }
        if (err === 401) {
          return setResponseMessage(incorrectCredentialsMessage);
        }
        return setResponseMessage(somethingWentWrong);
      })
      .finally(() => setIsLoading(false));
  }

  const handleUpdateUser = (name, email) => {
    setIsLoading(true);
    updateUser(name, email)
      .then((res) => {
        setCurrentUser(res);
        setResponseMessage(successUpdateMessage);
      })
      .catch((err) => {
        if (err === 400) {
          return setResponseMessage(incorrectDataMessage);
        }
        if (err === 409) {
          return setResponseMessage(sameEmailMessage);
        }
        return setResponseMessage(somethingWentWrong);
      })
      .finally(() => setIsLoading(false));
  }

  const handleSignout = () => {
    signout()
      .then(() => {
        localStorage.removeItem('movies');
        localStorage.removeItem('lastSearch');
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

  const handleResetResponseMessage = () => setResponseMessage(null);

  const handleSearchSubmit = (searchValue) => {
    const { localMovies } = getDataFromStorage();
    localStorage.setItem('lastSearch', searchValue);

    if (localMovies) {
      return setMovies(filterMoviesByName(localMovies, searchValue));
    }

    setIsLoading(true);
    getAllMovies()
      .then((res) => {
        localStorage.setItem('movies', JSON.stringify(res));

        setMovies(filterMoviesByName(res, searchValue));
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
    const { localMovies, lastSearch } = getDataFromStorage();

    localMovies && setMovies(filterMoviesByName(localMovies, lastSearch));
    handleTokenCheck();
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoadingContext.Provider value={isLoading}>
        <ResponseMessageContext.Provider value={{responseMessage, handleResetResponseMessage}}>
          <div className="page">

            {!isChecking ? (
            <Switch>
              <Route exact path="/">
                <Header
                  onMenuClick={handleNavigationClick}
                />
                <Main />
                <Footer />
              </Route>

              <ProtectedRoute exact path="/movies" tokenCheck={handleTokenCheck}>
                <Header
                  onMenuClick={handleNavigationClick}
                />
                <Movies
                  movies={movies}
                  savedMovies={savedMovies}
                  onSubmit={handleSearchSubmit}
                  onClick={handleClickMovie}
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
                <Profile
                  onLogout={handleSignout}
                  userData={currentUser}
                  onSubmit={handleUpdateUser}
                />
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
            ) : (
              <Preloader />
            )}

            {currentUser && (
              <Popup isOpen={isNavigationPopupOpen} onClose={closeAllPopups} />
            )}

          </div>
        </ResponseMessageContext.Provider>
      </IsLoadingContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
