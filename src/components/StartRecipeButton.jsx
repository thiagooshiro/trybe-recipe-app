import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import handleHistoryPush from '../helpers/Functions';
import RecipeContext from '../context/RecipeContext';

function StartRecipeButton({ history, id, path }) {
  const { recipeStarted, setRecipeStarted,
    setRecipeDone, recipeDone } = useContext(RecipeContext);

  useEffect(() => (
    (!localStorage.getItem('doneRecipes'))
      ? localStorage.setItem('doneRecipes', JSON.stringify([]))
      : setRecipeDone(JSON.parse(localStorage.getItem('doneRecipes')))
  ), []);

  useEffect(() => (
    (!localStorage.getItem('inProgressRecipes'))
      ? localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { },
        meals: { },
      }))
      : setRecipeStarted(JSON.parse(localStorage.getItem('inProgressRecipes')))
  ), []);

  const locator = () => (
    Object.values(recipeStarted).find((recipe) => (Object.keys(recipe).includes(id)))
  );

  const renderButton = () => (
    <Button
      text={ recipeStarted && (locator()) ? 'Continuar Receita' : 'Start Recipe' }
      dataTestId="start-recipe-btn"
      onClick={ () => handleHistoryPush(history, id, path) }
      style={ (recipeDone && (recipeDone.some((recipe) => recipe.id.includes(id))))
        ? { position: 'fixed', bottom: '0px', visibility: 'hidden' }
        : { position: 'fixed', bottom: '0px' } }
    />
  );

  return (
    <div className="recipe-button">
      { recipeDone && recipeStarted && renderButton() }
    </div>
  );
}

StartRecipeButton.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
};

export default StartRecipeButton;
