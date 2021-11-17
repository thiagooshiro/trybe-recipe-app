import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';
import {
  fetchIngredientFoodAPI, fetchNameFoodAPI, fetchFirstLetterFoodAPI,
  fetchIngredientDrinkAPI, fetchNameDrinkAPI, fetchFirstLetterDrinkAPI,
  fetchRecipeDrinkAPI, fetchFoodCatListAPI, fetchDrinkCatListAPI,
  fetchFoodCatFilterAPI, fetchDrinkCatFilterAPI, fetchDetailsAPI,
} from '../services';

function RecipeProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [apiResult, setApiResult] = useState([]);
  const [alertState, setAlertState] = useState(true);
  const [catListResult, setCatListResult] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [textState, setTextState] = useState('');
  const [resultDetails, setResultDetails] = useState('');
  const [recomendation, setRecomendation] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recipeStarted, setRecipeStarted] = useState([]);
  const [recipeDone, setRecipeDone] = useState([]);
  const alertMsg = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const ingredientAPI = async (ingredient, title) => {
    if (title.includes('Comidas')) { // Manter atenção para caso o teste retorne erro devido ao case sensitive.
      const data = await fetchIngredientFoodAPI(ingredient);
      const { meals } = data;
      setApiResult(meals);
      if (!meals) global.alert(alertMsg);
      return meals;
    }
    if (title.includes('Bebidas')) { // Manter atenção para caso o teste retorne erro devido ao case sensitive.
      const data = await fetchIngredientDrinkAPI(ingredient);
      const { drinks } = data;
      setApiResult(drinks);
      if (!drinks) global.alert(alertMsg);
      return drinks;
    }
  };

  const nameAPI = async (name, title) => {
    if (title.includes('omidas')) {
      const data = await fetchNameFoodAPI(name);
      const { meals } = data;
      setApiResult(meals);
      if (!meals) global.alert(alertMsg);
      return meals;
    }
    if (title.includes('ebidas')) {
      const data = await fetchNameDrinkAPI(name);
      const { drinks } = data;
      setApiResult(drinks);
      if (!drinks) global.alert(alertMsg);
      return drinks;
    }
  };

  // req 36
  const recomendationAPI = async (name, title) => {
    if (title.includes('ebidas')) {
      const data = await fetchNameFoodAPI(name);
      const { meals } = data;
      setApiResult(meals);
      if (!meals) global.alert(alertMsg);
      return meals;
    }
    if (title.includes('omidas')) {
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

  const recipeDrinkAPI = async () => {
    const data = await fetchRecipeDrinkAPI();
    const { drinks } = data;
    setApiResult(drinks);
    if (!drinks) global.alert(alertMsg);
    return drinks;
  };

  const foodCatListAPI = async () => {
    const data = await fetchFoodCatListAPI();
    const { meals } = data;
    setCatListResult(meals);
    if (!meals) global.alert(alertMsg);
    return meals;
  };

  const drinkCatListAPI = async () => {
    const data = await fetchDrinkCatListAPI();
    const { drinks } = data;
    setCatListResult(drinks);
    if (!drinks) global.alert(alertMsg);
    return drinks;
  };

  const foodCatFilterAPI = async (category) => {
    const data = await fetchFoodCatFilterAPI(category);
    const { meals } = data;
    setApiResult(meals);
    if (!meals) global.alert(alertMsg);
    return meals;
  };

  const drinkCatFilterAPI = async (category) => {
    const data = await fetchDrinkCatFilterAPI(category);
    const { drinks } = data;
    setApiResult(drinks);
    if (!drinks) global.alert(alertMsg);
    return drinks;
  };

  const detailsAPI = async (id, path) => {
    let mealOrDrink = '';
    if (path.includes('comidas')) mealOrDrink = 'meal';
    if (path.includes('bebidas')) mealOrDrink = 'cocktail';
    const data = await fetchDetailsAPI(mealOrDrink, id);
    const { meals, drinks } = data;
    setApiResult(!meals ? drinks : meals);
    return (!meals ? drinks : meals);
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
    recipeDrinkAPI,
    foodCatListAPI,
    drinkCatListAPI,
    foodCatFilterAPI,
    drinkCatFilterAPI,
    apiResult,
    setApiResult,
    alertState,
    setAlertState,
    catListResult,
    toggle,
    setToggle,
    textState,
    setTextState,
    detailsAPI,
    resultDetails,
    setResultDetails,
    recomendation,
    setRecomendation,
    recomendationAPI,
    favorites,
    setFavorites,
    recipeStarted,
    setRecipeStarted,
    recipeDone,
    setRecipeDone,
  };

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
