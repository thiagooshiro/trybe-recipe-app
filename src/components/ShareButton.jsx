import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ url }) {
  const [copy, setCopy] = useState(false);

  return (
    <Button
      text={
        !copy ? <img
          alt="share-icon"
          src={ shareIcon }
        />
          : <p>Link copiado!</p>
      }
      dataTestId="share-btn"
      onClick={ () => {
        navigator.clipboard.writeText(`http://localhost:3000${url}`);
        setCopy(true);
      } }
    />);
}

ShareButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default ShareButton;
