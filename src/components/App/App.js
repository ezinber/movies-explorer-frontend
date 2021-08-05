import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { getAllMovies } from '../../utils/MoviesApi';
import { filterMovies } from '../../utils/MoviesUtils';
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
import { getUser, register, signin, signout } from '../../utils/MainApi';

function App() {
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({})
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
    getUser()
      .then((res) => {
        setUserData(res)
        setIsLoggedIn(true);
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
        setIsLoggedIn(false);
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
    isSaved
    ? setSavedMovies((state) => state.filter((item) => item.id !== movie.id))
    : setSavedMovies([movie, ...savedMovies]);
  }


  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('movies'));
    if (!movies && localMovies) {
      setMovies(localMovies);
    }
  }, [movies])

  useEffect(() => {
    handleTokenCheck();
  }, [])

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header
            isLoggedIn={isLoggedIn}
            onMenuClick={handleNavigationClick}
          />
          <Main />
          <Footer />
        </Route>

        <Route path="/movies">
          <Header
            isLoggedIn={isLoggedIn}
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
        </Route>

        <Route path="/saved-movies">
          <Header
            isLoggedIn={isLoggedIn}
            onMenuClick={handleNavigationClick}
          />
          <SavedMovies
            movies={savedMovies}
            onClick={handleClickMovie}
          />
          <Footer />
        </Route>

        <Route path="/profile">
          <Header
            isLoggedIn={isLoggedIn}
            onMenuClick={handleNavigationClick}
          />
          <Profile onLogout={handleSignout} userData={userData}/>
        </Route>

        <Route path="/register">
          <Register onRegister={handleRegister} />
        </Route>

        <Route path="/login">
          <Login onLogin={handleSignin} />
        </Route>

        <Route path="/">
          <NotFound />
        </Route>
      </Switch>

      {isLoggedIn && <Popup isOpen={isNavigationPopupOpen} onClose={closeAllPopups} />}
    </div>
  );
}

export default App;
