import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Card.css';

function AreaCard(props) {
  const { thumb, meal, idMeal, history, index } = props;

  const handleClick = () => {
    history.push(`/comidas/${idMeal}`);
  };

  return (
    <button
      type="button"
      data-testid={ `${index}-recipe-card` }
      className="item-card"
      key={ index }
      onClick={ handleClick }
    >
      <img
        data-testid={ `${index}-card-img` }
        alt={ `${meal}` }
        src={ thumb }
      />
      <h6 data-testid={ `${index}-card-name` }>
        {meal}
      </h6>
    </button>
  );
}

AreaCard.propTypes = {
  meal: PropTypes.string.isRequired,
  idMeal: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  thumb: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default AreaCard;
