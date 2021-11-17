import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Card.css';

function IngredientCard(props) {
  const { index, mealOrDrink, ingredient, description, key } = props;

  return (
    <div data-testid={ `${index}-ingredient-card` } className="item-card" key={ key }>
      <img
        data-testid={ `${index}-card-img` }
        alt={ `${ingredient}` }
        src={ `https://www.the${mealOrDrink}db.com/images/ingredients/${ingredient}-Small.png` }
      />
      <h6
        data-testid={ `${index}-card-name` }
      >
        {description}
      </h6>
    </div>
  );
}

export default IngredientCard;
