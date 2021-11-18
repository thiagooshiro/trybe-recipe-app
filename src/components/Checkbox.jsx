import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';
import RecipeContext from '../context/RecipeContext';

function Checkbox({ ingredient, index, path, resultDetails, id }) {
  const {
    recipeStarted,
    setRecipeStarted,
    isChecked,
    setIsChecked,
    setAllCheck,
    arr,
  } = useContext(RecipeContext);

  const {
    object,
  } = resultDetails;

  const saver = async () => {
    await localStorage.setItem('inProgressRecipes', JSON.stringify(recipeStarted));
    await localStorage.setItem('arr', JSON.stringify(arr));
  };
  const cocktailRegister = async (target) => {
    if (arr && arr.includes(target.value)) {
      await arr.splice(arr.indexOf(target.value), 1);
    } else {
      await arr.push(target.value);
    }
    await setRecipeStarted({
      cocktails: { [id]: arr },
      ...recipeStarted,
    });
  };

  const mealsRegister = async (target) => {
    if (arr && arr.includes(target.value)) {
      await arr.splice(arr.indexOf(target.value), 1);
    } else {
      await arr.push(target.value);
    }
    await setRecipeStarted({
      ...recipeStarted,
      meals: { [id]: arr },
    });
  };

  const checker = async () => {
    if (arr.length !== Object.keys(object).length) {
      setIsChecked(isChecked - 1);
      setAllCheck(false);
    } else {
      setIsChecked(isChecked + 1);
      setAllCheck(true);
    }
  };

  const ingredientRender = () => {
    if (ingredient[1]) return (`${ingredient[0]}: ${ingredient[1]}`);
    return `${ingredient[0]}`;
  };

  // Check handler deve funcionar onchange para incluir o ingrediente na chave correta do localStorage.
  const useCheckHandler = async ({ target }) => {
    if (path.includes('comidas')) {
      mealsRegister(target);
    } else {
      cocktailRegister(target);
    }
    await saver();
    await checker();
  };

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(recipeStarted));
  }, [recipeStarted]);

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
        checked={ arr && arr.includes(`${ingredient[0]}`) }
      />
      { ingredientRender() }
    </label>
  );
}

Checkbox.propTypes = {
  ingredient: PropTypes.arrayOf(PropTypes.string).isRequired,
  resultDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default Checkbox;
