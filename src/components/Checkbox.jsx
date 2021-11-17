import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';
import RecipeContext from '../context/RecipeContext';

function Checkbox({ ingredient, index, /* path, */ resultDetails /* id */ }) {
  const {
    // recipeStarted,
    // setRecipeStarted,
    isChecked,
    setIsChecked,
    setAllCheck,
  } = useContext(RecipeContext);

  const {
    // idDrink,
    // idMeal,
    object,
  } = resultDetails;

  // Check handler deve funcionar onchange para incluir o ingrediente na chave correta do localStorage.
  const useCheckHandler = ({ target }) => {
    /* if (path.includes('comidas')) {
      // const meal = {
      //   [idMeal]: [target.value]
      // };
      if (recipeStarted.some((recipe) => recipe.idMeal.includes(target.value))) {
        recipeStarted.idMeal.pop(target.value);
        setRecipeStarted([...recipeStarted]);
      } else {
        setRecipeStarted({ meals: { [idMeal]: [target.value] } });
        localStorage.setItem('inProgressRecipes', JSON.stringify(recipeStarted));
      }
    } else
    //   const bebida = {
    //     idDrink: [...idDrink, target.value],
    //   };
    if (recipeStarted.some((recipe) => recipe.idDrink.includes(target.value))) {
      recipeStarted.idDrink.pop(target.value);
      setRecipeStarted([...recipeStarted]);
    } else {
      setRecipeStarted({ meals: { [idDrink]: [target.value] } });
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipeStarted));
    } */
    if (target.checked === false) {
      setIsChecked(isChecked - 1);
      if (isChecked !== Object.keys(object).length) setAllCheck(false);
    } else {
      setIsChecked(isChecked + 1);
      if (isChecked === Object.keys(object).length) setAllCheck(true);
    }
  };

  return (
    <label htmlFor={ `checkbox-progress-${index}` }>
      <input
        type="checkbox"
        className="checkbox"
        id={ `checkbox-progress-${index}` }
        name="checkbox-ingredients"
        key={ index }
        value={ `${ingredient[0]}` }
        onChange={ useCheckHandler }
      />
      {(ingredient[1] !== null
        ? `${ingredient[0]}: ${ingredient[1]}`
        : `${ingredient[0]}`)}
    </label>
  );
}

Checkbox.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.string).isRequired,
  resultDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default Checkbox;
