import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchDrinkIngredients } from '../../services';

import IngredientCard from '../../components/IngredientCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarBebidasPorIngredientes({ history }) {
  const [drinkIngredient, setDrinkIngredient] = useState([]);
  const MAX_INGREDIENTS = 12;
  useEffect(() => {
    const fetchDrinkIngredient = async () => {
      const ingredient = await fetchDrinkIngredients();
      setDrinkIngredient(ingredient.drinks);
    };
    fetchDrinkIngredient();
  }, []);
  return (
    <main>
      <Header title="Explorar Ingredientes" />
      <div className="card-container">
        {drinkIngredient && drinkIngredient
          .slice(0, MAX_INGREDIENTS).map((ingri, index) => (
            <IngredientCard
              ingredient={ ingri.strIngredient1 }
              index={ index }
              description={ ingri.strIngredient1 }
              key={ index }
              mealOrDrink="cocktail"
              name="bebidas"
              history={ history }
            />
          ))}
      </div>
      <Footer />
    </main>
  );
}

ExplorarBebidasPorIngredientes.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ExplorarBebidasPorIngredientes;
