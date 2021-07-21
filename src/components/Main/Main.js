import { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import './Main.css';

function Main() {
  const { hash } = useLocation();

  useEffect(() => {
    hash &&
      document
        .querySelector(hash)
        ?.scrollIntoView();
  });

  return(
    <main className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
    </main>
  );
}

export default memo(Main);