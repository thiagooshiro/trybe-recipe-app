/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Button from './Button';

import '../styles/Header.css';

function Header({ title, history }) {
  const {
    searchText,
    setSearchText,
    showInput,
    setShowInput,
    ingredientAPI,
    nameAPI,
    firstLetterAPI,
    recipeDrinkAPI,
  } = useContext(RecipeContext);

  const onLoadList = async () => {
    if (title === 'Comidas') await ingredientAPI(searchText, title);
    if (title === 'Bebidas') await recipeDrinkAPI();
  };

  useEffect(() => {
    onLoadList();
  }, []);

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
      if (resultIngredient && resultIngredient.length === 1) {
        const key = Object.values(resultIngredient[0])[0];
        history.push(`/${title.toLowerCase()}/${key}`);
      }
    }

    if (name.checked) {
      const resultName = await nameAPI(searchText, title);
      setSearchText('');
      if (resultName && resultName.length === 1) {
        const key = Object.values(resultName[0])[0];
        history.push(`/${title.toLowerCase()}/${key}`);
      }
    }

    if (firstLetter.checked && searchText.length === 1) {
      const resultFirstLetter = await firstLetterAPI(searchText, title);
      setSearchText('');
      if (resultFirstLetter && resultFirstLetter.length === 1) {
        const key = Object.values(resultFirstLetter[0])[0];
        history.push(`/${title.toLowerCase()}/${key}`);
      }
    }

    if (firstLetter.checked && searchText.length !== 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  function renderSearch() {
    return (
      <div className="search-container">
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
  const hiderTester = () => {
    if (title.includes('Explorar')) return false;
    if (title.includes('Perfil')) return false;
    if (title.includes('Feitas')) return false;
    return true;
  };
  return (
    <header className="header-container">
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          alt="profile-icon"
          src={ profileIcon }
        />
      </Link>

      <h3 data-testid="page-title">{title}</h3>

      { (hiderTester()) && <Button
        dataTestId="search-top-btn"
        onClick={ searchIconClick }
        src={ searchIcon }
        text={ <img
          alt="search-icon"
          src={ searchIcon }
        /> }
      /> }
      {showInput && renderSearch()}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Header;
