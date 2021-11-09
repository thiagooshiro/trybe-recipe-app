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

export const fetchCategoryDrinkAPI = async () => {
  const endpoint = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

  const result = await endpoint.json();
  return result;
};
