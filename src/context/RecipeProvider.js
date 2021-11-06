import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import { fetchIngredientAPI, fetchNameAPI, fetchFirstLetterAPI } from '../services';

function RecipeProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ingredientAPI = async (ingredient) => {
    const data = await fetchIngredientAPI(ingredient);
    const { meals } = data;
    setIsLoading(false);
    return meals;
  };

  const nameAPI = async (name) => {
    const data = await fetchNameAPI(name);
    const { meals } = data;
    setIsLoading(false);
    return meals;
  };

  const firstLetterAPI = async (firstLetter) => {
    const data = await fetchFirstLetterAPI(firstLetter);
    const { meals } = data;
    setIsLoading(false);
    return meals;
  };

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    searchText,
    setSearchText,
    showInput,
    setShowInput,
    ingredientAPI,
    nameAPI,
    firstLetterAPI,
    isLoading };

  return (
    <RecipeContext.Provider
      value={ contextValue }
    >
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
