import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRandomFoodAPI } from '../../services/index';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import '../../styles/ExplorarComidas.css';

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
    <main>
      <Header title="Explorar Comidas" />
      <div className="container-food-explore">
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
      </div>
      <Footer />
    </main>
  );
}

export default ExplorarComidas;
