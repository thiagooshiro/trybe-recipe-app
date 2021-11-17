import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy'); // testando biblioteca

function ShareButton({ url }) {
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
      dataTestId="share-btn"
      onClick={ () => {
        copy(`http://localhost:3000${url}`); // testando window.navigator no evaluator do gitHub Req. 43.
        setCopy(true);
      } }
    />);
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ShareButton;
