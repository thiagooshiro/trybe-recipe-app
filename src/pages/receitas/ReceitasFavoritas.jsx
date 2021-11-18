import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from '../../context/RecipeContext';
import Button from '../../components/Button';
import ThumbCards from '../../components/ThumbCards';
import Header from '../../components/Header';

function ReceitasFavoritas({ match: { path } }) {
  const { favorites, setFavorites,
    setFilterFavorites, filterFavorites } = useContext(RecipeContext);

  const RESULTS_PER_PAGE = 12;

  useEffect(() => (
    (!localStorage.getItem('favoriteRecipes'))
      ? localStorage.setItem('favoriteRecipes', JSON.stringify([]))
      : setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')))
  ), []);

  useEffect(() => (
    (!localStorage.getItem('favoriteRecipes'))
      ? localStorage.setItem('favoriteRecipes', JSON.stringify([]))
      : setFilterFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')))
  ), []);

  const renderHandler = (param) => (
    (param).slice(0, RESULTS_PER_PAGE).map((recipe, i) => (
      <ThumbCards
        key={ recipe.id }
        id={ recipe.id }
        result={ recipe }
        name={ recipe.name }
        image={ recipe.image }
        imageDataTestId={ `${i}-horizontal-image` }
        categoryDataTestId={ `${i}-horizontal-top-text` }
        category={ recipe.category }
        nameDataTestId={ `${i}-horizontal-name` }
        buttonDataTestID={ `${i}-horizontal-share-btn` }
        i={ i }
        areaOrAlcoholic={ recipe.area || recipe.alcoholicOrNot }
        type={ recipe.type }
        path={ path }
      />
    ))
  );

  const handleAllFilter = () => {
    setFilterFavorites(favorites);
  };

  const handleFoodFilter = () => {
    setFilterFavorites(favorites.filter((recipe) => recipe.type.includes('comida')));
  };

  const handleDrinksFilter = () => {
    setFilterFavorites(favorites.filter((recipe) => recipe.type.includes('bebida')));
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <Button
        text="All"
        dataTestId="filter-by-all-btn"
        onClick={ handleAllFilter }
      />
      <Button
        text="Food"
        dataTestId="filter-by-food-btn"
        onClick={ handleFoodFilter }
      />
      <Button
        text="Drinks"
        dataTestId="filter-by-drink-btn"
        onClick={ handleDrinksFilter }
      />
      { favorites && renderHandler(filterFavorites)}
    </div>
  );
}

ReceitasFavoritas.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ReceitasFavoritas;
