import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ThumbCards from '../components/ThumbCards';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Button from '../components/Button';

import '../styles/Bebidas.css';

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
    <main>
      <Header title="Bebidas" history={ history } />
      <nav className="cat-button-container">
        { catListResult && <Button
          text="All"
          dataTestId="All-category-filter"
          onClick={ handleAllFilter }
          className="cat-button"
        />}
        {catListResult && catListResult.slice(0, CAT_LIST_RANGE).map((cat, i) => (
          <Button
            key={ i }
            text={ cat.strCategory }
            dataTestId={ `${cat.strCategory}-category-filter` }
            onClick={ handleFilter }
            className="cat-button"
          />
        ))}
      </nav>
      <body className="card-container">
        {
          !apiResult
            ? null
            : apiResult
              .slice(0, RESULTS_PER_PAGE)
              .map((mealOrDrink, i) => (
                <ThumbCards
                  keyId={ i }
                  key={ i }
                  name={ mealOrDrink.strDrink }
                  id={ mealOrDrink.idDrink }
                  type="bebida"
                  image={ mealOrDrink.strDrinkThumb }
                  divDataTestID={ `${i}-recipe-card` }
                  imageDataTestId={ `${i}-card-img` }
                  nameDataTestId={ `${i}-card-name` }
                />
              ))
        }
      </body>
      <Footer />
    </main>
  );
}

Bebidas.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Bebidas;
