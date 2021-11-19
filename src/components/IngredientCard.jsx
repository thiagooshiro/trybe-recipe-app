import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import '../styles/Card.css';
import RecipeContext from '../context/RecipeContext';

function IngredientCard(props) {
  const { setSearchText, searchText } = useContext(RecipeContext);
  const { index, mealOrDrink, ingredient, description, key, name, history } = props;

  const handleClick = async () => {
    setSearchText(ingredient);
    console.log(searchText);
    history.push(`/${name}`);
  };

  return (
    <button
      data-testid={ `${index}-ingredient-card` }
      className="item-card"
      key={ key }
      onClick={ handleClick }
      type="button"
    >
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
    </button>
  );
}

IngredientCard.propTypes = {
  description: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
  mealOrDrink: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
};

export default IngredientCard;
