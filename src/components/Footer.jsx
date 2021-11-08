import React from 'react';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

import '../styles/Footer.css';

function Footer() {
  return (
    <div data-testid="footer" className="bottom-menu">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        src={ drinkIcon }
        alt="drink icon"
      >
        <img src={ drinkIcon } alt="drink icon" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        src={ exploreIcon }
        alt="explore icon"
      >
        <img src={ exploreIcon } alt="explore icon" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        src={ mealIcon }
        alt="meal icon"
      >
        <img src={ mealIcon } alt="meal icon" />
      </button>
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
