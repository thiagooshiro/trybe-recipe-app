import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchFoodIngredients } from '../../services';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import IngredientCard from '../../components/IngredientCard';

function ExplorarComidasPorIngredientes({ history }) {
  const [mealIngredient, setMealIngredient] = useState([]);
  const MAX_INGREDIENTS = 12;
  useEffect(() => {
    const fetchMealIngredient = async () => {
      const ingredient = await fetchFoodIngredients();
      setMealIngredient(ingredient.meals);
    };
    fetchMealIngredient();
    console.log(mealIngredient);
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {mealIngredient && mealIngredient.slice(0, MAX_INGREDIENTS).map((ingri, index) => (
        <IngredientCard
          ingredient={ ingri.strIngredient }
          index={ index }
          description={ ingri.strIngredient }
          key={ index }
          mealOrDrink="meal"
          name="comidas"
          history={ history }
        />
      ))}
      <Footer />
    </div>
  );
}

ExplorarComidasPorIngredientes.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ExplorarComidasPorIngredientes;
