import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
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

const savedMoviesTest = [
  {
    "id": 6,
    "nameRU": "Фавела на взрыве",
    "nameEN": "Favela on Blast",
    "director": "Уэсли Пенц",
    "country": "Бразилия",
    "year": "2008",
    "duration": 80,
    "description": "**Визионер из трущоб**\nГимн бразильским гетто (они же фавелы), породившим байле-фанк — взбалмошную смесь музыки стран третьего мира, нелегального рейва и злого фанка, на волне которого вышли в люди Майя и Сантиголд. Снял фильм не кто иной, как Дипло (он же Уэсли Пенц) — диджей, продюсер и крестный отец двух вышеупомянутых артисток. Поэтому неудивительно, что вместо истории жанра в сухом остатке у него вышла увлекательная этнографическая экспедиция в трущобы Рио-де-Жанейро, где наркотики, секс и зашкаливающий уровень преступности играют в становлении байле-фанка не меньшую роль, чем сама музыка.\n",
    "trailerLink": "https://www.youtube.com/watch?v=Cugdwa7mndA",
    "created_at": "2020-12-02T20:37:33.665Z",
    "updated_at": "2020-12-02T20:37:33.665Z",
    "image": {
      "id": 6,
      "name": "881707734_640",
      "alternativeText": "",
      "caption": "",
      "width": 640,
      "height": 360,
      "formats": {
        "thumbnail": {
          "hash": "thumbnail_881707734_640_d6a3a43358",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "width": 245,
          "height": 138,
          "size": 6.09,
          "path": null,
          "url": "/uploads/thumbnail_881707734_640_d6a3a43358.jpeg"
        },
        "small": {
          "hash": "small_881707734_640_d6a3a43358",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "width": 500,
          "height": 281,
          "size": 17.26,
          "path": null,
          "url": "/uploads/small_881707734_640_d6a3a43358.jpeg"
        }
      },
      "hash": "881707734_640_d6a3a43358",
      "ext": ".jpeg",
      "mime": "image/jpeg",
      "size": 23.67,
      "url": "/uploads/881707734_640_d6a3a43358.jpeg",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "created_at": "2020-12-02T20:37:23.499Z",
      "updated_at": "2020-12-02T20:37:23.499Z"
    }
  },
  {
    "id": 20,
    "nameRU": "Еще одно слово на П",
    "nameEN": "The Other F Word",
    "director": "Андреа Блаугрунд",
    "country": "США",
    "year": "2011",
    "duration": 98,
    "description": "Пронзительный, смешной и неожиданно мудрый взгляд на то, как ветераны панк-сцены (в фильме появляются люди в диапазоне от Фэт Майка из NOFX до Фли из RHCP) справляются с вызовами отцовства. Разумеется, попытки матерящихся, покрытых с ног до головы татуировками музыкантов примерить на себя костюм добропорядочного папаши из раза в раз оборачивается уморительной комедией положений. Одни отцы тайком вытаскивают кукол барби из своих чемоданов в преддверии очередного тура, другие являются к директору школы в футболке fuck the police. Все это, впрочем, не делает фильм одним только сборником анекдотов, но куда глубже исследует, как и во что эволюционирует идея протеста и антиавторитаризма в тот момент, когда самому нужно становиться авторитетом и ходить на родительские собрания.",
    "trailerLink": "https://www.youtube.com/watch?v=zZkWHZ3hJtY",
    "created_at": "2020-12-02T21:25:58.848Z",
    "updated_at": "2020-12-02T21:25:58.848Z",
    "image": {
      "id": 20,
      "name": "загруженное (2)",
      "alternativeText": "",
      "caption": "",
      "width": 295,
      "height": 171,
      "formats": {
        "thumbnail": {
          "hash": "thumbnail_zagruzhennoe_2_5f87844408",
          "ext": ".jpeg",
          "mime": "image/jpeg",
          "width": 245,
          "height": 142,
          "size": 8.59,
          "path": null,
          "url": "/uploads/thumbnail_zagruzhennoe_2_5f87844408.jpeg"
        }
      },
      "hash": "zagruzhennoe_2_5f87844408",
      "ext": ".jpeg",
      "mime": "image/jpeg",
      "size": 10.32,
      "url": "/uploads/zagruzhennoe_2_5f87844408.jpeg",
      "previewUrl": null,
      "provider": "local",
      "provider_metadata": null,
      "created_at": "2020-12-02T21:25:42.189Z",
      "updated_at": "2020-12-02T21:25:42.189Z"
    }
  }
]

function App() {
  const isLoggedIn = true;
  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);
  const [movies, setMovies] = useState(null);
  const [savedMovies, setSavedMovies] = useState(savedMoviesTest);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSaveMovie = (movie, isSaved) => {
    
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
            savedMovies={savedMovies}
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
          <SavedMovies movies={savedMovies}/>
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
