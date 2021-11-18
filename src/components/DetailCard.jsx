import PropTypes from 'prop-types';
import React from 'react';

function DetailCard({ resultDetails }) {
  const {
    strMealThumb,
    strDrinkThumb,
    strDrink,
    strMeal,
  } = resultDetails;
  return (
    <>
      <img
        src={ strMealThumb || strDrinkThumb }
        alt={ strDrink || strMeal }
        data-testid="recipe-photo"
        style={ { width: '150px' } }
      />
      <h3 data-testid="recipe-title">
        {strDrink || strMeal}
      </h3>
    </>
  );
}

DetailCard.propTypes = {
  resultDetails: PropTypes.shape({
    strDrink: PropTypes.string.isRequired,
    strDrinkThumb: PropTypes.string.isRequired,
    strMeal: PropTypes.string.isRequired,
    strMealThumb: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailCard;
