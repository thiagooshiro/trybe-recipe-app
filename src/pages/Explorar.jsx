import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <div className="container-explore">
      <Header title="Explorar" />
      <Link to="/explorar/comidas">
        <Button
          dataTestId="explore-food"
          text="Explorar Comidas"
        />
      </Link>
      <Link to="/explorar/bebidas">
        <Button
          dataTestId="explore-drinks"
          text="Explorar Bebidas"
        />
      </Link>
      <Footer />
    </div>
  );
}

export default Explorar;
