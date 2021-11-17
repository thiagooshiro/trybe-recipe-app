import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import RecipeContext from '../context/RecipeContext';

function DoneRecipeButton({ resultDetails, path }) {
  const { recipeDone, setRecipeDone } = useContext(RecipeContext);

  const {
    idDrink,
    idMeal,
    strCategory,
    strAlcoholic,
    strDrink,
    strMeal,
    strArea,
    strDrinkThumb,
    strMealThumb,
    strTags,
  } = resultDetails;

  useEffect(() => (
    (!localStorage.getItem('doneRecipes'))
      ? localStorage.setItem('doneRecipes', JSON.stringify([]))
      : setRecipeDone(JSON.parse(localStorage.getItem('doneRecipes')))
  ), []);

  const useDoneHandler = () => {
    if (path.includes('comidas')) {
      const comida = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
        doneDate: new Date().toLocaleDateString(),
        tags: strTags,
      };
      if (recipeDone.some((recipe) => recipe.id.includes(idMeal))) {
        recipeDone.pop(comida);
        setRecipeDone([...recipeDone]);
      } else {
        setRecipeDone([...recipeDone, comida]);
      }
      localStorage.setItem('doneRecipes', JSON.stringify([...recipeDone]));
    } else {
      const bebida = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
        doneDate: new Date().toLocaleDateString(),
        tags: '',
      };
      if (recipeDone.some((recipe) => recipe.id.includes(idDrink))) {
        recipeDone.pop(bebida);
        setRecipeDone([...recipeDone]);
      } else {
        setRecipeDone([...recipeDone, bebida]);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipeDone));
  }, [recipeDone]);

  return (
    <Button
      data-testid="finish-recipe-btn"
      text="Finalizar Receita"
      onClick={ useDoneHandler }
    />
  );
}

DoneRecipeButton.propTypes = {
  path: PropTypes.objectOf(PropTypes.any).isRequired,
  resultDetails: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DoneRecipeButton;
