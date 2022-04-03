/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import Recomendation from '../components/Recomendation';
import StartRecipeButton from '../components/StartRecipeButton';
import DetailCard from '../components/DetailCard';

import '../styles/Detalhes.css';

function Detalhes({ history, match: { url, path, params: { id } } }) {
  const { detailsAPI,
    resultDetails,
    setResultDetails,
    recomendationAPI,
    recomendation,
    setRecomendation,
  } = useContext(RecipeContext);

  const {
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
    strAlcoholic,
  } = resultDetails;

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

  const renderFavoriteButton = () => {
    if (resultDetails) {
      return (
        <FavoriteButton
          id={ resultDetails.idDrink || resultDetails.idMeal }
          name={ resultDetails.strDrink || resultDetails.strMeal }
          image={ resultDetails.strDrinkThumb || resultDetails.strMealThumb }
          category={ resultDetails.strCategory }
          buttonDataTestID="favorite-btn"
          area={ resultDetails.strArea }
          alcoholicOrNot={ resultDetails.strAlcoholic }
          path={ path }
        />
      );
    }
  };

  const renderRecomendation = async () => {
    const LIMIT = 6;
    const result = await recomendationAPI('', path);
    setRecomendation(result.slice(0, LIMIT));
  };

  useEffect(() => {
    detailsResult();
    renderRecomendation();
  }, []);

  return (
    <main className="main-detail">
      <DetailCard resultDetails={ resultDetails } />
      <span className="details-card">
        <ShareButton url={ url } id={ id } />
        { renderFavoriteButton() }
        <p data-testid="recipe-category" className="category-name">
          {`Categoria: ${path.includes('bebidas') ? strAlcoholic : strCategory}`}
        </p>
      </span>
      <div id="ingredient-name-and-measure" className="ingredients-container">
        <h4> Ingredients </h4>
        <ul>
          { resultDetails.object
          && Object.entries(resultDetails.object)
            .map((ingredient, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                { (ingredient[1] !== null
                  ? `${ingredient[0]}: ${ingredient[1]}`
                  : `${ingredient[0]}`)}
              </li>
            ))}
        </ul>
      </div>
      <div data-testid="instructions" className="instructions-container">
        <h4>Instructions</h4>
        <p>{strInstructions}</p>
      </div>
      <div data-testid="video" className="video">
        {path.includes('comidas') ? <iframe
          width="300"
          height="195"
          src={ strYoutube }
          title={ strMeal }
        /> : null}
      </div>
      <div id="recomendation-card" className="recomendation-card">
        <h4>Recomendation Recipes</h4>
        <Recomendation recomendation={ recomendation } />
      </div>
      <StartRecipeButton
        history={ history }
        id={ id }
        path={ path }
      />
    </main>
  );
}

Detalhes.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Detalhes;
