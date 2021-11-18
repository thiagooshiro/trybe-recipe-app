export const fetchIngredientFoodAPI = async (ingredient) => {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

  const result = await endpoint.json();
  return result;
};

export const fetchNameFoodAPI = async (name) => {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);

  const result = await endpoint.json();
  return result;
};

export const fetchFirstLetterFoodAPI = async (firstLetter) => {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);

  const result = await endpoint.json();
  return result;
};

export const fetchIngredientDrinkAPI = async (ingredient) => {
  const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

  const result = await endpoint.json();
  return result;
};

export const fetchNameDrinkAPI = async (name) => {
  const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

  const result = await endpoint.json();
  return result;
};

export const fetchFirstLetterDrinkAPI = async (firstLetter) => {
  const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`);

  const result = await endpoint.json();
  return result;
};

// req 25 e 26
export const fetchRecipeDrinkAPI = async () => {
  const endpoint = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  const result = await endpoint.json();
  return result;
};

// req 27
export const fetchFoodCatListAPI = async () => {
  const endpoint = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');

  const result = await endpoint.json();
  return result;
};

export const fetchDrinkCatListAPI = async () => {
  const endpoint = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');

  const result = await endpoint.json();
  return result;
};

// req 28
export const fetchFoodCatFilterAPI = async (category) => {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

  const result = await endpoint.json();
  return result;
};

export const fetchDrinkCatFilterAPI = async (category) => {
  const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

  const result = await endpoint.json();
  return result;
};

// req 33
export const fetchDetailsAPI = async (mealOrDrink, id) => {
  const endpoint = await fetch(`https://www.the${mealOrDrink}db.com/api/json/v1/1/lookup.php?i=${id}`);

  const result = await endpoint.json();
  /*   if (mealOrDrink === 'meal') ;
  if (mealOrDrink === 'cocktails') setDrinkInfo(result) */
  return result;
};
// requisito 74
export const fetchRandomFoodAPI = async () => {
  const endpoint = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const result = await endpoint.json();
  return result;
};

export const fetchRandomDrinkAPI = async () => {
  const endpoint = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const result = await endpoint.json();
  return result;
};
// requisto 75
export const fetchFoodIngredients = async () => {
  const endpoint = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
  const result = await endpoint.json();
  return result;
};

export const fetchDrinkIngredients = async () => {
  const endpoint = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const result = await endpoint.json();
  return result;
};

//  requisito 78
export const fetchMealsForArea = async (origin) => {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${origin}`);
  const result = endpoint.json();
  return result;
};
