import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './RecipeContext';

function RecipeProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchText, setSearchText] = useState('');
  const [showInput, setShowInput] = useState(false);

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    searchText,
    setSearchText,
    showInput,
    setShowInput };

  return (
    <RecipeContext.Provider
      value={ contextValue }
    >
      {children}
    </RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipeProvider;
