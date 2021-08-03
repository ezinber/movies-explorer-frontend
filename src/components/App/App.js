import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { getAllMovies } from '../../utils/MoviesApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Popup from '../Popup/Popup';

function App() {
  const isLoggedIn = true;
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const closeAllPopups = () => {
    setIsNavigationPopupOpen(false);
  }

  const handleNavigationClick = () => setIsNavigationPopupOpen(true);

  const handleSearchSubmit = (searchValue, isChecked) => {
    setIsLoading(true);
    getAllMovies()
      .then((res) => {
        const filteredMovies = res.filter((item) => {
          const name = item.nameRU.toLowerCase();
          const search = searchValue.toLowerCase();
          const isShort = item.duration <= 40;

          if (isChecked) {
            return name.includes(search) && isShort;
          }

          return name.includes(search);
        })

        localStorage.setItem('movies', JSON.stringify(filteredMovies));
        setMovies(filteredMovies);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }


  useEffect(() => {
    if (!movies && localStorage.getItem('movies')) {
      const localMovies = JSON.parse(localStorage.getItem('movies'));
      setMovies(localMovies);
    }
  }, [movies])

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
            handleSearchSubmit={handleSearchSubmit}
            isLoading={isLoading}
          />
          <Footer />
        </Route>

        <Route path="/saved-movies">
          <Header
            isLoggedIn={isLoggedIn}
            onMenuClick={handleNavigationClick}
          />
          <SavedMovies movies={movies}/>
          <Footer />
        </Route>

        <Route path="/profile">
          <Header
            isLoggedIn={isLoggedIn}
            onMenuClick={handleNavigationClick}
          />
          <Profile />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
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
