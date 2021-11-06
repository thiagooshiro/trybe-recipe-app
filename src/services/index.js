export const fetchIngredientAPI = async (ingredient) => {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

  const result = await endpoint.json();
  return result;
};

export const fetchNameAPI = async (name) => {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);

  const result = await endpoint.json();
  return result;
};

export const fetchFirstLetterAPI = async (firstLetter) => {
  const endpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);

  const result = await endpoint.json();
  return result;
};
