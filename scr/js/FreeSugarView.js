// FreeSugar.js
import { createElement } from './utils';

function FreeSugarView(recipes, categoryName) {
  const title = createElement('h2', { textContent: `${categoryName} Recipes` });
  const recipeList = createElement('ul', { className: 'recipe-list' });

  recipes.forEach((recipe) => {
    const listItem = createElement('li', {
      textContent: recipe.strMeal,
    });
    recipeList.appendChild(listItem);
  });

  // Render FreeSugarView in the root element
  const root = document.getElementById('root');
  root.innerHTML = ''; // Clear current view

  root.appendChild(
    createElement('div', { className: 'recipe-list-view' }, [title, recipeList])
  );
}

export default FreeSugarView;
