import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import '../styles/Detalhes.css';

export default function Recomendation({ recomendation }) {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 2,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  return (
    <Carousel responsive={ responsive }>
      { recomendation
        && recomendation.map((recipe, index) => (
          <li
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strDrink || recipe.strMeal }
              data-testid="recipe-photo"
            />
            <p
              data-testid={ `${index}-recomendation-title` }
            >
              { recipe.strMeal || recipe.strDrink }
            </p>
          </li>
        )) }
    </Carousel>
  );
}

Recomendation.propTypes = {
  recomendation: PropTypes.arrayOf(PropTypes.object).isRequired,
};
