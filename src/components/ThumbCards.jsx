import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Card.css';
import Button from './Button';
import shareIcon from '../images/shareIcon.svg';
import FavoriteButton from './FavoriteButton';

import '../styles/Comidas.css';

function ThumbCards({
  divDataTestID, buttonDataTestID,
  image, imageDataTestId,
  name, nameDataTestId,
  category, categoryDataTestId,
  doneDate, dateDataTestId,
  tags, i, type,
  areaOrAlcoholic, id, path,
}) {
  const [copyTo, setCopy] = useState(false);

  const dateHandler = () => {
    if (doneDate) {
      return (
        <h3 data-testid={ dateDataTestId }>
          {`Feita em ${doneDate}`}
        </h3>
      );
    }
  };

  const tagHandler = () => (
    <>
      <h3 data-testid={ categoryDataTestId }>
        {`${areaOrAlcoholic} - ${category}`}
      </h3>
      { dateHandler() }
      {tags && tags.map((tag, j) => (
        <h3
          data-testid={ `${i}-${tag}-horizontal-tag` }
          key={ j }
        >
          {tag}
        </h3>
      ))}
    </>
  );

  const shareButtonRender = () => {
    if (category) {
      return (
        <Button
          dataTestId={ buttonDataTestID }
          src={ shareIcon }
          text={
            !copyTo ? <img
              alt="share-icon"
              src={ shareIcon }
              style={ { width: '50px', height: '50px' } }
            />
              : <p>Link copiado!</p>
          }
          onClick={ () => {
            window.navigator.clipboard.writeText(`http://localhost:3000/${type}s/${id}`); // testando window.navigator no evaluator do gitHub Req. 43.
            setCopy(true);
          } }
        />
      );
    }
  };

  const favoriteButtonRender = () => {
    if (path && path.includes('favoritas')) {
      return (
        <FavoriteButton
          // resultDetails={ resultDetails }
          id={ id }
          name={ name }
          image={ image }
          category={ category }
          buttonDataTestID={ `${i}-horizontal-favorite-btn` }
          area={ areaOrAlcoholic }
          alcoholicOrNot={ areaOrAlcoholic }
          path={ `${type}s` }
        />
      );
    }
  };

  return (

    <div data-testid={ divDataTestID } className="item-card">
      <Link
        key={ i }
        to={ `/${type}s/${id}` }
      >
        <img
          alt={ name }
          src={ image }
          data-testid={ imageDataTestId }
        />
        <h3
          data-testid={ nameDataTestId }
        >
          {name}
        </h3>
      </Link>
      {category && tagHandler()}
      {shareButtonRender()}
      {favoriteButtonRender()}
    </div>

  );
}

ThumbCards.propTypes = {
  areaOrAlcoholic: PropTypes.string.isRequired,
  buttonDataTestID: PropTypes.string.isRequired,
  category: PropTypes.func.isRequired,
  categoryDataTestId: PropTypes.string.isRequired,
  dateDataTestId: PropTypes.string.isRequired,
  divDataTestID: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  imageDataTestId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameDataTestId: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default ThumbCards;
