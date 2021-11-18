import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import handleHistoryPush from '../helpers/Functions';
import RecipeContext from '../context/RecipeContext';

function StartRecipeButton({ history, id, path }) {
  const { recipeStarted, recipeDone, setRecipeDone } = useContext(RecipeContext);

  useEffect(() => (
    (!localStorage.getItem('doneRecipes'))
      ? localStorage.setItem('doneRecipes', JSON.stringify([]))
      : setRecipeDone(JSON.parse(localStorage.getItem('doneRecipes')))
  ), []);

  const renderButton = () => (
    <Button
      text={ recipeStarted.includes(id) ? 'Continuar Receita' : 'Start Recipe' }
      dataTestId="start-recipe-btn"
      onClick={ () => handleHistoryPush(history, id, path) }
      style={ (recipeDone && (recipeDone.some((recipe) => recipe.id.includes(id))))
        ? { position: 'fixed', bottom: '0px', visibility: 'hidden' }
        : { position: 'fixed', bottom: '0px' } }
    />
  );

  return (
    <div>
      { recipeDone && renderButton() }
    </div>
  );
}

StartRecipeButton.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.number.isRequired,
  path: PropTypes.string.isRequired,
};

export default StartRecipeButton;
