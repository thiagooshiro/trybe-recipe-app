import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Button from './Button';

function Header({ title, history }) {
  const {
    searchText,
    setSearchText,
    showInput,
    setShowInput,
    ingredientAPI,
    nameAPI,
    firstLetterAPI,
    // isLoading,
  } = useContext(RecipeContext);

  const searchIconClick = () => {
    setShowInput(!showInput);
  };

  const handleChange = (target, stateFunction) => {
    stateFunction(target.value);
  };

  const handleSearchClick = async (event) => {
    event.preventDefault();
    const ingredient = document.querySelector('#ingredient');
    const name = document.querySelector('#name');
    const firstLetter = document.querySelector('#firstLetter');

    if (ingredient.checked) {
      const resultIngredient = await ingredientAPI(searchText, title);
      setSearchText('');
      if (resultIngredient.length === 1) {
        const key = Object.values(resultIngredient[0])[0];
        history.push(`/${title.toLowerCase()}/${key}`);
      }
      return console.log(resultIngredient);
    }

    if (name.checked) {
      const resultName = await nameAPI(searchText, title);
      setSearchText('');
      if (resultName.length === 1) {
        const key = Object.values(resultName[0])[0];
        history.push(`/${title.toLowerCase()}/${key}`);
      }
      return console.log(resultName);
    }

    if (firstLetter.checked && searchText.length === 1) {
      const resultFirstLetter = await firstLetterAPI(searchText, title);
      setSearchText('');
      if (resultFirstLetter.length === 1) {
        const key = Object.values(resultFirstLetter[0])[0];
        history.push(`/${title.toLowerCase()}/${key}`);
      }
      return console.log(resultFirstLetter);
    }

    if (firstLetter.checked && searchText.length !== 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  function renderSearch() {
    return (
      <div>
        <input
          type="text"
          value={ searchText }
          data-testid="search-input"
          onChange={ ({ target }) => handleChange(target, setSearchText) }
          placeholder="Buscar Receita"
          className="Searchbar"
        />
        <label htmlFor="ingredient">
          <input
            id="ingredient"
            type="radio"
            name="filterBy"
            value="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingrediente
        </label>
        <label htmlFor="name">
          <input
            id="name"
            type="radio"
            name="filterBy"
            value="name"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            id="firstLetter"
            name="filterBy"
            type="radio"
            value="firstLetter"
            data-testid="first-letter-search-radio"
          />
          Primeira Letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="submit"
          onClick={ (event) => handleSearchClick(event) }
        >
          Buscar

        </button>
      </div>
    );
  }

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
      {showInput && renderSearch() }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
