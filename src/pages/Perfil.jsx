import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/Perfil.css';

function Perfil() {
  const [userLogin, setUserLogin] = useState('');
  useEffect(() => {
    const userEmail = localStorage.getItem('user');
    const localStorageEmail = JSON.parse(userEmail);
    setUserLogin(localStorageEmail);
  }, []);

  const handleClick = () => {
    localStorage.clear();
  };

  return (
    <main>
      <Header title="Perfil" />
      <div className="profile-container">
        <span data-testid="profile-email">{userLogin && userLogin.email}</span>
        <Link to="/receitas-feitas">
          <button type="button" data-testid="profile-done-btn"> Receitas Feitas </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </main>
  );
}

export default Perfil;
