import React from 'react';
import PropTypes from 'prop-types';

function ThumbCards({ keyId, result }) {
  const { strMeal, strMealThumb, strDrink, strDrinkThumb } = result;

  return (
    <div data-testid={ `${keyId}-recipe-card` }>
      <img
        alt={ strMeal || strDrink }
        src={ strMealThumb || strDrinkThumb }
        data-testid={ `${keyId}-card-img` }
      />
      <h3 data-testid={ `${keyId}-card-name` }>{strMeal || strDrink}</h3>
    </div>
  );
}

ThumbCards.propTypes = {
  result: PropTypes.objectOf(PropTypes.any).isRequired,
  keyId: PropTypes.number.isRequired,
};

export default ThumbCards;
