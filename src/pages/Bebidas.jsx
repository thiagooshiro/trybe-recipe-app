import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ThumbCards from '../components/ThumbCards';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Button from '../components/Button';

function Bebidas({ history }) {
  const {
    apiResult,
    catListResult,
    drinkCatListAPI,
    drinkCatFilterAPI,
    toggle,
    setToggle,
    recipeDrinkAPI,
    textState,
    setTextState,
  } = useContext(RecipeContext);

  const RESULTS_PER_PAGE = 12;
  const CAT_LIST_RANGE = 5;

  const onLoadList = async () => {
    await drinkCatListAPI();
  };

  useEffect(() => {
    onLoadList();
  }, []);

  const handleAllFilter = async () => {
    await recipeDrinkAPI();
    setTextState('');
    setToggle(true);
  };

  const handleFilter = async ({ target }) => {
    if (toggle && textState !== target.innerText) {
      await drinkCatFilterAPI(target.innerText);
      setTextState(target.innerText);
      setToggle(!toggle);
    }

    if (toggle && textState === target.innerText) {
      await recipeDrinkAPI();
      setTextState('');
      setToggle(!toggle);
    }

    if (!toggle && textState !== target.innerText) {
      await drinkCatFilterAPI(target.innerText);
      setTextState(target.innerText);
      setToggle(!toggle);
    }

    if (!toggle && textState === target.innerText) {
      await recipeDrinkAPI();
      setTextState('');
      setToggle(!toggle);
    }
  };

  return (
    <div>
      <Header title="Bebidas" history={ history } />
      { catListResult && <Button
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
              <Link
                key={ i }
                to={ `/bebidas/${mealOrDrink.idDrink}` }
              >
                <ThumbCards
                  keyId={ i }
                  name={ mealOrDrink.strDrink }
                  image={ mealOrDrink.strDrinkThumb }
                  divDataTestID={ `${i}-recipe-card` }
                  imageDataTestId={ `${i}-card-img` }
                  nameDataTestId={ `${i}-card-name` }
                />
              </Link>
            ))
      }
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Bebidas;
