import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import RecipeContext from '../context/RecipeContext';

function FavoriteButton({ buttonDataTestID,
  image,
  name,
  category,
  area,
  alcoholicOrNot, id, path }) {
  const { favorites, setFavorites } = useContext(RecipeContext);

  useEffect(() => (
    (!localStorage.getItem('favoriteRecipes'))
      ? localStorage.setItem('favoriteRecipes', JSON.stringify([]))
      : setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')))
  ), []);

  const useFavoritesHandler = () => {
    const recipe = {
      id,
      type: (path.includes('comidas') ? 'comida' : 'bebida'),
      area: (path.includes('bebidas') ? '' : area),
      category,
      alcoholicOrNot: (path.includes('comidas') ? '' : alcoholicOrNot),
      name,
      image,
    };
    if (favorites.some(() => recipe.id.includes(id))) {
      favorites.splice(favorites.indexOf(recipe));
      setFavorites([...favorites]);
    } else {
      setFavorites([...favorites, recipe]);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([...favorites]));
  };

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
  }, [favorites]);

  return (
    <Button
      text={
        <img
          alt="whiteHeartIcon"
          src={ favorites.some((page) => page.id.includes(id))
            ? blackHeartIcon : whiteHeartIcon }
          data-testid={ buttonDataTestID }
          style={ { width: '50px', height: '50px' } }
        />
      }
      onClick={ useFavoritesHandler }
    />
  );
}

FavoriteButton.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  buttonDataTestID: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default FavoriteButton;
