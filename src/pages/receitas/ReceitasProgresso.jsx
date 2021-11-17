/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';
import ShareButton from '../../components/ShareButton';

import '../../styles/ReceitasProgresso.css';
import FavoriteButton from '../../components/FavoriteButton';
import DoneRecipeButton from '../../components/DoneRecipeButton';
import Checkbox from '../../components/Checkbox';

function ReceitasProgresso({ history, match: { url, path, params: { id } } }) {
  const {
    resultDetails,
    detailsAPI,
    setResultDetails,
    setRecipeStarted,
  } = useContext(RecipeContext);

  const detailsResult = async () => {
    const api = await detailsAPI(id, path);
    const result = api[0];
    setResultDetails(result);

    const chaves = Object.keys(result)
      .filter((ingredient) => ingredient.includes('strIngredient'));

    const valores = Object.keys(result)
      .filter((ingredient) => ingredient.includes('strMeasure'));

    const obj = chaves.reduce((acc, valor, index) => {
      if (result[valor]) {
        acc[result[valor]] = result[valores[index]];
      }
      return acc;
    }, {});
    setResultDetails({ ...result, object: obj });
  };

  useEffect(() => {
    detailsResult();
    return (!localStorage.getItem('inProgressRecipes'))
      ? localStorage.setItem('inProgressRecipes', JSON.stringify([]))
      : setRecipeStarted(JSON.parse(localStorage.getItem('inProgressRecipes')));
  }, []);

  const {
    strDrink,
    strMeal,
    strCategory,
    strInstructions,
    strMealThumb,
    strDrinkThumb,
    strAlcoholic,
  } = resultDetails;

  return (
    <main>
      {path.includes('bebidas') ? <p>bebidas detalhes</p> : <p>comidas detalhes</p>}
      <img
        src={ strMealThumb || strDrinkThumb }
        alt={ strDrink || strMeal }
        data-testid="recipe-photo"
        style={ { width: '150px' } }
      />
      <h3 data-testid="recipe-title">
        {strDrink || strMeal}
      </h3>
      <ShareButton url={ url } id={ id } />
      <FavoriteButton resultDetails={ resultDetails } path={ path } />
      <p data-testid="recipe-category">
        {`Categoria: ${path.includes('bebidas') ? strAlcoholic : strCategory}`}
      </p>
      <div id="ingredient-name-and-measure">
        <h4> Ingredients </h4>
        {resultDetails && resultDetails.object
          && Object.entries(resultDetails.object)
            .map((ingredient, index) => (
              <div
                className="checkbox-container"
                data-testid={ `${index}-ingredient-step` }
                key={ index }
              >
                <Checkbox
                  ingredient={ ingredient }
                  index={ index }
                  path={ path }
                  resultDetails={ resultDetails }
                  id={ id }
                />
              </div>
            ))}
      </div>
      <div data-testid="instructions">
        <h4>Instructions</h4>
        <p>{strInstructions}</p>
      </div>
      <DoneRecipeButton
        resultDetails={ resultDetails }
        path={ path }
        counter={ resultDetails.object }
        history={ history }
      />
    </main>
  );
}

ReceitasProgresso.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ReceitasProgresso;
