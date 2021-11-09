import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ThumbCards from '../components/ThumbCards';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';

function Bebidas({ history }) {
  const { apiResult } = useContext(RecipeContext);

  const RESULTS_PER_PAGE = 12;

  return (
    <div>
      <Header title="Bebidas" history={ history } />
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

Bebidas.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Bebidas;
