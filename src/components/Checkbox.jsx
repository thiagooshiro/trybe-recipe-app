import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

function Checkbox({ ingredient, index }) {
  // Check handler deve funcionar onchange para incluir o ingrediente na chave correta do localStorage.
  // const useCheckHandler = ({ target }) => {
  //   if (path.includes('comidas')) {
  //     const comida = {
  //       idMeal: [...idMeal, target.value],
  //     };
  //     if (recipeStarted.some((recipe) => recipe.idMeal.includes(target.value))) {
  //       recipeStarted.idMeal.pop(comida);
  //       setRecipeStarted([...recipeStarted]);
  //     } else {
  //       setRecipeStarted([...recipeStarted, comida]);
  //     }
  //   } else {
  //     const bebida = {
  //       idDrink: [...idDrink, target.value],
  //     };
  //     if (recipeStarted.some((recipe) => recipe.idDrink.includes(target.value))) {
  //       recipeStarted.idDrink.pop(comida);
  //       setRecipeStarted([...recipeStarted]);
  //     } else {
  //       setRecipeStarted([...recipeStarted, bebida]);
  //     }
  //   }
  // };

  return (
    <label htmlFor={ `checkbox-progress-${index}` }>
      <input
        type="checkbox"
        id={ `checkbox-progress-${index}` }
        name="checkbox-ingredients"
        key={ index }
        value={ `${ingredient[0]}` }
        // onChange={ useCheckHandler }
      />
      {(ingredient[1] !== null
        ? `${ingredient[0]}: ${ingredient[1]}`
        : `${ingredient[0]}`)}
    </label>
  );
}

Checkbox.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.string).isRequired,
  index: PropTypes.number.isRequired,
};

export default Checkbox;
