import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchRandomDrinkAPI } from '../../services/index';

import Button from '../../components/Button';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function ExplorarBebidas() {
  const [randomDrink, setRandomDrink] = useState({});

  useEffect(() => {
    const fetchRandomDrink = async () => {
      const random = await fetchRandomDrinkAPI();
      setRandomDrink(random.drinks[0]);
    };
    fetchRandomDrink();
  }, []);

  return (
    <div className="container-drinks-explore">
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <Button
          dataTestId="explore-by-ingredient"
          text="Por Ingredientes"
        />
      </Link>
      <Link to={ `/bebidas/${randomDrink.idDrink}` }>
        <Button
          dataTestId="explore-surprise"
          text="Me Surpreenda!"
        />
      </Link>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
