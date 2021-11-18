import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ThumbCards from '../components/ThumbCards';
import RecipeContext from '../context/RecipeContext';
import Button from '../components/Button';

function Comidas({ history }) {
  const {
    apiResult,
    searchText,
    catListResult,
    foodCatListAPI,
    foodCatFilterAPI,
    ingredientAPI,
    toggle,
    setToggle,
    textState,
    setTextState,
  } = useContext(RecipeContext);

  const RESULTS_PER_PAGE = 12;
  const CAT_LIST_RANGE = 5;

  const onLoadList = async () => {
    await foodCatListAPI();
  };

  useEffect(() => {
    onLoadList();
    console.log(apiResult);
  }, []);

  const handleAllFilter = async () => {
    await ingredientAPI(searchText, 'Comidas');
    setTextState('');
    setToggle(true);
  };

  const handleFilter = async ({ target }) => {
    if (toggle && textState !== target.innerText) {
      await foodCatFilterAPI(target.innerText);
      setTextState(target.innerText);
      setToggle(!toggle);
    }

    if (toggle && textState === target.innerText) {
      await ingredientAPI(searchText, 'Comidas');
      setTextState('');
      setToggle(!toggle);
    }

    if (!toggle && textState !== target.innerText) {
      await foodCatFilterAPI(target.innerText);
      setTextState(target.innerText);
      setToggle(!toggle);
    }

    if (!toggle && textState === target.innerText) {
      await ingredientAPI(searchText, 'Comidas');
      setTextState('');
      setToggle(!toggle);
    }
  };

  return (
    <div>
      <Header title="Comidas" history={ history } />
      {catListResult && <Button
        text="All"
        dataTestId="All-category-filter"
        onClick={ handleAllFilter }
      />}
      {catListResult && catListResult.slice(0, CAT_LIST_RANGE).map((cat, i) => (
        <Button
          key={ i }
          text={ cat.strCategory }
          dataTestId={ `${cat.strCategory}-category-filter` }
          onClick={ handleFilter }
        />
      ))}
      {
        !apiResult
          ? null
          : apiResult
            .slice(0, RESULTS_PER_PAGE)
            .map((mealOrDrink, i) => (
              <ThumbCards
                key={ i }
                keyId={ i }
                name={ mealOrDrink.strMeal }
                id={ mealOrDrink.idMeal }
                type="comida"
                image={ mealOrDrink.strMealThumb }
                divDataTestID={ `${i}-recipe-card` }
                imageDataTestId={ `${i}-card-img` }
                nameDataTestId={ `${i}-card-name` }
              />
            ))
      }
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Comidas;
