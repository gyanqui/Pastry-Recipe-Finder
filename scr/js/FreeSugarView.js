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

  const root = document.getElementById('root');
  root.innerHTML = '';
  root.appendChild(
    createElement('div', { className: 'recipe-list-view' }, [title, recipeList])
  );
}

export default FreeSugarView;
