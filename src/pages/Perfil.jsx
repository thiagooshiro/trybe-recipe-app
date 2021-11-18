import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    <div>
      <Header title="Perfil" />
      <span data-testid="profile-email">{userLogin && userLogin.email}</span>
      <button type="button" data-testid="profile-done-btn"> Receitas Feitas </button>
      <button type="button" data-testid="profile-favorite-btn">Receitas Favoritas</button>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Perfil;
