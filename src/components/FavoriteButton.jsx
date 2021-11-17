import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';

function FavoriteButton({ resultDetails, path }) {
  const { favorites, setFavorites } = useContext(RecipeContext);

  const {
    idDrink,
    idMeal,
    strCategory,
    strAlcoholic,
    strDrink,
    strMeal,
    strArea,
    strDrinkThumb,
    strMealThumb,
  } = resultDetails;

  useEffect(() => (
    (!localStorage.getItem('favoriteRecipes'))
      ? localStorage.setItem('favoriteRecipes', JSON.stringify([]))
      : setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')))
  ), []);

  const useFavoritesHandler = () => {
    if (path.includes('comidas')) {
      const comida = {
        id: idMeal,
        type: 'comida',
        area: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
      if (favorites.some((recipe) => recipe.id.includes(idMeal))) {
        favorites.pop(comida);
        setFavorites([...favorites]);
      } else {
        setFavorites([...favorites, comida]);
      }
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites]));
    } else {
      const bebida = {
        id: idDrink,
        type: 'bebida',
        area: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
      if (favorites.some((recipe) => recipe.id.includes(idDrink))) {
        favorites.pop(bebida);
        setFavorites([...favorites]);
      } else {
        setFavorites([...favorites, bebida]);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Button
      text={
        <img
          alt="whiteHeartIcon"
          src={ favorites.some((page) => page.id.includes(idMeal || idDrink))
            ? blackHeartIcon : whiteHeartIcon }
          data-testid="favorite-btn"
        />
      }
      onClick={ useFavoritesHandler }
    />
  );
}

FavoriteButton.propTypes = {
  path: PropTypes.objectOf(PropTypes.any).isRequired,
  resultDetails: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default FavoriteButton;
