/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';
import ShareButton from '../../components/ShareButton';
import FavoriteButton from '../../components/FavoriteButton';
import DoneRecipeButton from '../../components/DoneRecipeButton';
import Checkbox from '../../components/Checkbox';

import '../../styles/ReceitasProgresso.css';

function ReceitasProgresso({ history, match: { url, path, params: { id } } }) {
  const {
    resultDetails,
    detailsAPI,
    setResultDetails,
    setRecipeStarted,
    setArr,
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
  }, []);

  useEffect(() => (
    (!localStorage.getItem('inProgressRecipes'))
      ? localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { },
        meals: { },
      }))
      : setRecipeStarted(JSON.parse(localStorage.getItem('inProgressRecipes')))
  ), []);

  useEffect(() => (
    (!localStorage.getItem('arr'))
      ? localStorage.setItem('arr', JSON.stringify([]))
      : setArr(JSON.parse(localStorage.getItem('arr')))
  ), []);

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
    <main className="main-progress">
      <div className="details-card">
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
        <FavoriteButton
        // resultDetails={ resultDetails }
          id={ resultDetails.idDrink || resultDetails.idMeal }
          name={ resultDetails.strDrink || resultDetails.strMeal }
          image={ resultDetails.strDrinkThumb || resultDetails.strMealThumb }
          category={ resultDetails.strCategory }
          buttonDataTestID="favorite-btn"
          area={ resultDetails.strArea }
          alcoholicOrNot={ resultDetails.strAlcoholic }
          path={ path }
        />
        <p data-testid="recipe-category" className="category-name">
          {`Categoria: ${path.includes('bebidas') ? strAlcoholic : strCategory}`}
        </p>
      </div>
      <div id="ingredient-name-and-measure" className="ingredients-container">
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
      <div data-testid="instructions" className="instructions-container">
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
