import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    text,
    // className,
    onClick,
    dataTestId,
    disabled,
  } = props;

  return (
    <button
      type="button"
      // className={ className }
      onClick={ onClick }
      disabled={ disabled }
      data-testid={ dataTestId }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
