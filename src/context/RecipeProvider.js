import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import {
  fetchIngredientFoodAPI, fetchNameFoodAPI, fetchFirstLetterFoodAPI,
  fetchIngredientDrinkAPI, fetchNameDrinkAPI, fetchFirstLetterDrinkAPI,
} from '../services';

function RecipeProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const ingredientAPI = async (ingredient, title) => {
    if (title.includes('Comidas')) { // Manter atenção para caso o teste retorne erro devido ao case sensitive.
      const data = await fetchIngredientFoodAPI(ingredient);
      const { meals } = data;
      setIsLoading(false);
      return meals;
    }
    if (title.includes('Bebidas')) { // Manter atenção para caso o teste retorne erro devido ao case sensitive.
      const data = await fetchIngredientDrinkAPI(ingredient);
      const { drinks } = data;
      setIsLoading(false);
      return drinks;
    }
  };

  const nameAPI = async (name, title) => {
    if (title.includes('Comidas')) {
      const data = await fetchNameFoodAPI(name);
      const { meals } = data;
      setIsLoading(false);
      return meals;
    }
    if (title.includes('Bebidas')) {
      const data = await fetchNameDrinkAPI(name);
      const { drinks } = data;
      setIsLoading(false);
      return drinks;
    }
  };

  const firstLetterAPI = async (firstLetter, title) => {
    if (title.includes('Comidas')) {
      const data = await fetchFirstLetterFoodAPI(firstLetter);
      const { meals } = data;
      setIsLoading(false);
      return meals;
    }
    if (title.includes('Bebidas')) {
      const data = await fetchFirstLetterDrinkAPI(firstLetter);
      const { drinks } = data;
      setIsLoading(false);
      return drinks;
    }
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
