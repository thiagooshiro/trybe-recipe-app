import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="bottom-menu">
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
        />
      </Link>
      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="explore icon"
        />
      </Link>
      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="meal icon"
        />
      </Link>
    </div>
  );
}

// renderizar nas pags:
// barra de busca
// tela de explorar
// tela de explorar bebidas
// tela de explorar ingredientes
// tela de explorar por local de origem
// tela principal de receitas
// tela de perfil

export default Footer;
