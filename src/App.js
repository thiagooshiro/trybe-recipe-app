import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import RecipeProvider from './context/RecipeProvider';
import Login from './pages/Login';
import Bebidas from './pages/Bebidas';
import Comidas from './pages/Comidas';
import Detalhes from './pages/Detalhes';
import Perfil from './pages/Perfil';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/explorar/ExplorarComidas';
import ExplorarBebidas from './pages/explorar/ExplorarBebidas';
import ReceitasProgresso from './pages/receitas/ReceitasProgresso';

import ExplorarBebidasPorIngredientes
  from './pages/explorar/ExplorarBebidasPorIngredientes';
import ExplorarComidasPorIngredientes
  from './pages/explorar/ExplorarComidasPorIngredientes';

import './App.css';

function App() {
  return (
    <RecipeProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/comidas/:id" component={ Detalhes } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/bebidas/:id" component={ Detalhes } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/comidas/:id/in-progress" component={ ReceitasProgresso } />
        <Route exact path="/bebidas/:id/in-progress" component={ ReceitasProgresso } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasPorIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasPorIngredientes }
        />
      </Switch>
    </RecipeProvider>
  );
}

export default App;
