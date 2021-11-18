import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import RecipeContext from '../../context/RecipeContext';
import AreaCard from '../../components/AreaCard';

import { fetchMealsForArea } from '../../services/index';

function ExplorarArea({ history }) {
  const [locations, setLocations] = useState([]);
  const [filter, setFilter] = useState('');
  const { ingredientAPI, apiResult, setApiResult } = useContext(RecipeContext);
  const MAGICAL_NUMBER = 12;

  const areaAPI = async () => {
    const areas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await areas.json();
    setLocations(data.meals);
  };

  useEffect(() => {
    areaAPI();
    ingredientAPI(filter, 'Comidas');
  }, []);

  useEffect(() => {
    const originMeal = async () => {
      if (filter) {
        const data = await fetchMealsForArea(filter);
        setApiResult(data.meals);
        console.log(data);
      }
      if (!filter) {
        ingredientAPI(filter, 'Comidas');
      }
    };
    originMeal();
  }, [filter]);

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };

  return (
    <>
      <Header title="Explorar Origem" />
      <div>
        <select
          value={ filter }
          onChange={ handleChange }
          data-testid="explore-by-area-dropdown"
        >
          <option value="" data-testid="All-option">All</option>
          {locations && locations.map((opt, index) => (
            <option
              data-testid={ `${opt.strArea}-option` }
              key={ index }
              value={ opt.strArea }
            >
              { opt.strArea }
            </option>
          ))}
        </select>
      </div>
      <div>
        { apiResult && apiResult.slice(0, MAGICAL_NUMBER).map((meal, i) => (
          <AreaCard
            key={ i }
            index={ i }
            meal={ meal.strMeal }
            thumb={ meal.strMealThumb }
            idMeal={ meal.idMeal }
            history={ history }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}

ExplorarArea.propTypes = {
  history: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default ExplorarArea;
