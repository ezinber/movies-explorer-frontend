import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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

const moviesList = [
  {
    _id: '1',
    nameRU: '33 слова о дизайне',
    duration: '1ч 47м',
    image: 'https://picsum.photos/800/600',
    isSaved: false,
  },
  {
    _id: '2',
    nameRU: '33 слова о дизайне',
    duration: '1ч 47м',
    image: 'https://picsum.photos/800/600',
    isSaved: false,
  },
  {
    _id: '3',
    nameRU: '33 слова о дизайне',
    duration: '1ч 47м',
    image: 'https://picsum.photos/800/600',
    isSaved: true,
  },
  {
    _id: '4',
    nameRU: '33 слова о дизайне',
    duration: '1ч 47м',
    image: 'https://picsum.photos/800/600',
    isSaved: false,
  },
  {
    _id: '5',
    nameRU: '33 слова о дизайне',
    duration: '1ч 47м',
    image: 'https://picsum.photos/800/600',
    isSaved: true,
  },
  {
    _id: '6',
    nameRU: '33 слова о дизайне',
    duration: '1ч 47м',
    image: 'https://picsum.photos/800/600',
    isSaved: false,
  },
];

function App() {
  const isLoggedIn = true;
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [movies, setMovies] = useState(null);

  const closeAllPopups = () => {
    setIsNavigationPopupOpen(false);
  }

  const handleNavigationClick = () => setIsNavigationPopupOpen(true);

  useEffect(() => {
    setMovies(moviesList);
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
          <Movies movies={movies}/>
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
