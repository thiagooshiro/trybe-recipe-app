import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Button from './Button';

function Header({ title }) {
  const {
    searchText,
    setSearchText,
    showInput,
    setShowInput,
  } = useContext(RecipeContext);

  const searchIconClick = () => {
    setShowInput(!showInput);
  };

  const handleChange = (target, stateFunction) => {
    stateFunction(target.value);
  };

  return (
    <header>
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          alt="profile-icon"
          src={ profileIcon }
        />
      </Link>

      <h3 data-testid="page-title">{title}</h3>

      <Button
        dataTestId="search-top-btn"
        onClick={ searchIconClick }
        text={ <img
          alt="search-icon"
          src={ searchIcon }
        /> }

      />
      {showInput
        && <input
          type="text"
          value={ searchText }
          data-testid="search-input"
          onChange={ ({ target }) => handleChange(target, setSearchText) }
          className="Searchbar"
        />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
