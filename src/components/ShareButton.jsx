import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import shareIcon from '../images/shareIcon.svg';

import '../styles/Detalhes.css';

const copy = require('clipboard-copy'); // testando biblioteca

function ShareButton({ url, id }) {
  const [copyTo, setCopy] = useState(false);

  return (
    <Button
      text={
        !copyTo ? <img
          alt="share-icon"
          src={ shareIcon }
        />
          : <p>Link copiado!</p>
      }
      className="share-button"
      dataTestId="share-btn"
      onClick={ () => {
        const mealOrDrink = url.includes('comidas') ? 'comidas' : 'bebidas';
        copy(`http://localhost:3000/${mealOrDrink}/${id}`); // testando window.navigator no evaluator do gitHub Req. 43.
        setCopy(true);
      } }
    />);
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ShareButton;
