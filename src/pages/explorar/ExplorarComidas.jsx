import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRandomFoodAPI } from '../../services/index';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarComidas() {
  const [randomFood, setRandomFood] = useState({});

  useEffect(() => {
    const fetchRandomFood = async () => {
      const random = await fetchRandomFoodAPI();
      setRandomFood(random.meals[0]);
    };
    fetchRandomFood();
  }, []);

  return (
    <div className="container-food-explore">
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <Button
          dataTestId="explore-by-ingredient"
          text="Por Ingredientes"
        />
      </Link>
      <Link to="/explorar/comidas/area">
        <Button
          dataTestId="explore-by-area"
          text="Por Local de Origem"
        />
      </Link>
      <Link to={ `/comidas/${randomFood.idMeal}` }>
        <Button
          dataTestId="explore-surprise"
          text="Me Surpreenda!"
        />
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
