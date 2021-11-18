/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';
import StartRecipeButton from '../components/StartRecipeButton';

function Detalhes({ history, match: { url, path, params: { id } } }) {
  const { detailsAPI,
    resultDetails,
    setResultDetails,
    recomendationAPI,
    recomendation,
    setRecomendation,
  } = useContext(RecipeContext);

  const {
    strDrink,
    strMeal,
    strCategory,
    strInstructions,
    strMealThumb,
    strDrinkThumb,
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

  const renderRecomendation = async () => {
    const result = await recomendationAPI('', path);
    setRecomendation(result);
  };

  useEffect(() => {
    detailsResult();
    renderRecomendation();
  }, []);

  return (
    <main>
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
      <div data-testid="instructions">
        <h4>Instructions</h4>
        <p>{strInstructions}</p>
      </div>
      <div data-testid="video">
        {path.includes('comidas') ? <iframe
          width="300"
          height="195"
          src={ strYoutube }
          title={ strMeal }
        /> : null}
      </div>
      <div id="recomendation-card">
        <h4>Recomendation Recipes</h4>
        { recomendation
        && recomendation.map((recipe, index) => (
          <li
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            { recipe.strMeal || recipe.strDrink }
          </li>
        )) }
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
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Detalhes;
