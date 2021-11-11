import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';

import Button from '../../components/Button';
import ShareButton from '../../components/ShareButton';

import '../../styles/ReceitasProgresso.css';

function ReceitasProgresso({ match: { url, path, params: { id } } }) {
  const { resultDetails, detailsAPI, setResultDetails } = useContext(RecipeContext);

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
      <p>OI!!!!</p>
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
      <ShareButton url={ url } />
      <Button
        text="Favorite"
        dataTestId="favorite-btn"
        onClick={ () => console.log('Favorite') }
      />
      <p data-testid="recipe-category">
        {`Categoria: ${path.includes('bebidas') ? strAlcoholic : strCategory}`}
      </p>
      <div id="ingredient-name-and-measure">
        <h4> Ingredients </h4>
        { resultDetails && resultDetails.object
        && Object.entries(resultDetails.object)
          .map((ingredient, index) => (
            <div
              className="checkbox-container"
              data-testid={ `${index}-ingredient-step` }
              key={ index }
            >
              <input
                type="checkbox"
                id={ `checkbox-progress-${index}` }
                name="checkbox-ingredients"
                key={ index }
              />
              <label htmlFor={ `checkbox-progress-${index}` }>
                { (ingredient[1] !== null
                  ? `${ingredient[0]}: ${ingredient[1]}`
                  : `${ingredient[0]}`) }
              </label>
            </div>
          ))}
      </div>
      <div data-testid="instructions">
        <h4>Instructions</h4>
        <p>{strInstructions}</p>
      </div>
      <Button
        dataTestId="finish-recipe-btn"
        text="Finalizar Receita"
      />
    </main>
  );
}

ReceitasProgresso.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ReceitasProgresso;
