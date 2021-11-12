import React from 'react';

import '../styles/Card.css';

function Checkbox(ingredient, checked) {
  return (
    <div>
      <input
        type="checkbox"
        id="codificação"
        name="checkbox-progress"
        checked={ checked }
      />
      <label htmlFor="checkbox-progress">{ingredient}</label>
    </div>
  );
}

export default Checkbox;
