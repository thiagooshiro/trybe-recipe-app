import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Explorar.css';

function Explorar() {
  return (
    <main>
      <Header title="Explorar" />
      <div className="container-explore">
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
      </div>
      <Footer />
    </main>
  );
}

export default Explorar;
