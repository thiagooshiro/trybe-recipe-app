import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Card.css';
import Button from './Button';
import shareIcon from '../images/shareIcon.svg';

// const copy = require('clipboard-copy');

function ThumbCards({
  divDataTestID, buttonDataTestID,
  image, imageDataTestId,
  name, nameDataTestId,
  category, categoryDataTestId,
  doneDate, dateDataTestId,
  tags, i, type,
  areaOrAlcoholic, id,
}) {
  const [copyTo, setCopy] = useState(false);

  const tagHandler = () => (
    <>
      <h3 data-testid={ categoryDataTestId }>
        {`${areaOrAlcoholic} - ${category}`}
      </h3>
      <h3 data-testid={ dateDataTestId }>
        {`Feita em ${doneDate}`}
      </h3>
      { tags && tags.map((tag, j) => (
        <h3
          data-testid={ `${i}-${tag}-horizontal-tag` }
          key={ j }
        >
          {tag}
        </h3>
      ))}

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
          console.log(id);
        } }
      />
    </>
  );

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
      { category && tagHandler()}
    </div>
  );
}

ThumbCards.propTypes = {
  divDataTestID: PropTypes.string.isRequired,
  buttonDataTestID: PropTypes.string.isRequired,
  category: PropTypes.func.isRequired,
  categoryDataTestId: PropTypes.string.isRequired,
  doneDate: PropTypes.string.isRequired,
  dateDataTestId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageDataTestId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  nameDataTestId: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  areaOrAlcoholic: PropTypes.string.isRequired,
};

export default ThumbCards;
