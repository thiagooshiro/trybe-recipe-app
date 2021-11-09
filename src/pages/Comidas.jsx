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
  }, []);

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
                result={ mealOrDrink }
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
