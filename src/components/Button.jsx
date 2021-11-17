import React from 'react';
import PropTypes from 'prop-types';

function Button(props) {
  const {
    text,
    className,
    onClick,
    dataTestId,
    disabled,
    style,
    src,
  } = props;

  return (
    <button
      type="button"
      className={ className }
      onClick={ onClick }
      disabled={ disabled }
      data-testid={ dataTestId }
      style={ style }
      src={ src }
    >
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  dataTestId: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  style: PropTypes.objectOf(PropTypes.any).isRequired,
  src: PropTypes.string.isRequired,
};

export default Button;
