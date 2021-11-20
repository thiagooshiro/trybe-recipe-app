import PropTypes from 'prop-types';
import React from 'react';

import '../styles/Detalhes.css';

function DetailCard({ resultDetails }) {
  const {
    strMealThumb,
    strDrinkThumb,
    strDrink,
    strMeal,
  } = resultDetails;
  return (
    <div className="detail-img-title">
      <img
        src={ strMealThumb || strDrinkThumb }
        alt={ strDrink || strMeal }
        data-testid="recipe-photo"
      />
      <h3 data-testid="recipe-title">
        {strDrink || strMeal}
      </h3>
    </div>
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
