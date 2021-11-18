import React from 'react';
// import { fetchDrinkIngredients } from '../../services';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarBebidasPorIngredientes() {
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <p>Bebidas ingredientes</p>
      {/* <div data-testid={ `${index}-ingredient-card` }>
        <img
          data-testid={ `${index}-card-img` }
          alt={ `${ingredient}` }
          src={ `https://www.themealdb.com/images/ingredients/{nome-do-ingrediente}.png` }
        />
        <h6
          data-testid={ `${index}-card-name` }
        >
          { ingredient }
        </h6>
      </div> */}
      <Footer />
    </div>
  );
}

export default ExplorarBebidasPorIngredientes;
