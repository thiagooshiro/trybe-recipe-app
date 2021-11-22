/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import RecipeContext from '../context/RecipeContext';

function DoneRecipeButton({ resultDetails, path, history }) {
  const { recipeDone, setRecipeDone, allCheck } = useContext(RecipeContext);

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

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(recipeDone));
  }, [recipeDone]);

  const useDoneHandler = async () => {
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
        tags: !strTags ? null : strTags.split(','),
      };
      if (recipeDone && recipeDone.some((recipe) => recipe.id.includes(idMeal))) {
        recipeDone.splice(recipeDone.indexOf(comida));
        await setRecipeDone([...recipeDone]);
      } else {
        await setRecipeDone([...recipeDone, comida]);
      }
      await localStorage.setItem('doneRecipes', JSON.stringify([...recipeDone]));
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
      if (recipeDone && recipeDone.some((recipe) => recipe.id.includes(idDrink))) {
        recipeDone.splice(recipeDone.indexOf(bebida));
        await setRecipeDone([...recipeDone]);
      } else {
        await setRecipeDone([...recipeDone, bebida]);
      }
      await localStorage.setItem('doneRecipes', JSON.stringify(recipeDone));
    }
    history.push('/receitas-feitas');
  };

  return (
    <div className="finish-recipe-button">
      <Button
        dataTestId="finish-recipe-btn"
        text="Finalizar Receita"
        onClick={ useDoneHandler }
        disabled={ !allCheck }
      />
    </div>
  );
}

DoneRecipeButton.propTypes = {
  path: PropTypes.objectOf(PropTypes.any).isRequired,
  resultDetails: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default DoneRecipeButton;
