import React, { useContext, useEffect } from 'react';
import RecipeContext from '../../context/RecipeContext';
import Button from '../../components/Button';
import ThumbCards from '../../components/ThumbCards';
import Header from '../../components/Header';

function ReceitasFeitas() {
  const { setRecipeDone, recipeDone,
    setFilterRecipeDone, filterRecipeDone } = useContext(RecipeContext);
  const RESULTS_PER_PAGE = 12;

  useEffect(() => (
    (!localStorage.getItem('doneRecipes'))
      ? localStorage.setItem('doneRecipes', JSON.stringify([]))
      : setRecipeDone(JSON.parse(localStorage.getItem('doneRecipes')))
  ), []);

  useEffect(() => (
    (!localStorage.getItem('doneRecipes'))
      ? localStorage.setItem('doneRecipes', JSON.stringify([]))
      : setFilterRecipeDone(JSON.parse(localStorage.getItem('doneRecipes')))
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
        dateDataTestId={ `${i}-horizontal-done-date` }
        doneDate={ recipe.doneDate }
        buttonDataTestID={ `${i}-horizontal-share-btn` }
        tags={ recipe.tags }
        i={ i }
        type={ recipe.type }
        areaOrAlcoholic={ recipe.area || recipe.alcoholicOrNot }
      />
    ))
  );

  const handleAllFilter = () => {
    setFilterRecipeDone(recipeDone);
  };

  const handleFoodFilter = () => {
    setFilterRecipeDone(recipeDone.filter((recipe) => recipe.type.includes('comida')));
  };

  const handleDrinksFilter = () => {
    setFilterRecipeDone(recipeDone.filter((recipe) => recipe.type.includes('bebida')));
  };

  return (
    <div>
      <Header title="Receitas Feitas" />
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
      { recipeDone && renderHandler(filterRecipeDone)}
    </div>
  );
}

export default ReceitasFeitas;
