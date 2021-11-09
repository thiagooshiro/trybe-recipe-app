import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import {
  fetchIngredientFoodAPI, fetchNameFoodAPI, fetchFirstLetterFoodAPI,
  fetchIngredientDrinkAPI, fetchNameDrinkAPI, fetchFirstLetterDrinkAPI,
  fetchCategoryDrinkAPI,
} from '../services';

function RecipeProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [apiResult, setApiResult] = useState([]);
  const [alertState, setAlertState] = useState(true);
  const alertMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const ingredientAPI = async (ingredient, title) => {
    if (title.includes('Comidas')) { // Manter atenção para caso o teste retorne erro devido ao case sensitive.
      const data = await fetchIngredientFoodAPI(ingredient);
      const { meals } = data;
      setApiResult(meals);
      console.log(data);
      if (!meals) global.alert(alertMsg);
      return meals;
    }
    if (title.includes('Bebidas')) { // Manter atenção para caso o teste retorne erro devido ao case sensitive.
      const data = await fetchIngredientDrinkAPI(ingredient);
      const { drinks } = data;
      setApiResult(drinks);
      console.log(data);
      if (!drinks) global.alert(alertMsg);
      return drinks;
    }
  };

  const nameAPI = async (name, title) => {
    if (title.includes('Comidas')) {
      const data = await fetchNameFoodAPI(name);
      const { meals } = data;
      setApiResult(meals);
      if (!meals) global.alert(alertMsg);
      return meals;
    }
    if (title.includes('Bebidas')) {
      const data = await fetchNameDrinkAPI(name);
      const { drinks } = data;
      setApiResult(drinks);
      if (!drinks) global.alert(alertMsg);
      return drinks;
    }
  };

  const firstLetterAPI = async (firstLetter, title) => {
    if (title.includes('Comidas')) {
      const data = await fetchFirstLetterFoodAPI(firstLetter);
      const { meals } = data;
      setApiResult(meals);
      if (!meals) global.alert(alertMsg);
      return meals;
    }
    if (title.includes('Bebidas')) {
      const data = await fetchFirstLetterDrinkAPI(firstLetter);
      const { drinks } = data;
      setApiResult(drinks);
      if (!drinks) global.alert(alertMsg);
      return drinks;
    }
  };

  const categoryDrinkAPI = async () => {
    const data = await fetchCategoryDrinkAPI();
    const { drinks } = data;
    setApiResult(drinks);
    if (!drinks) global.alert(alertMsg);
    return drinks;
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
    categoryDrinkAPI,
    apiResult,
    setApiResult,
    alertState,
    setAlertState };

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
