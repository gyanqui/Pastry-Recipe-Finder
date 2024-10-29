import { createElement } from './utils';

function FavoriteRecipesView() {
  const title = createElement('h2', { textContent: 'Your Favorite Recipes' });
  const favoritesSection = createElement('div', {
    className: 'favorites-section',
  });

  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  favorites.forEach((recipe) => {
    const recipeCard = createElement('div', { className: 'recipe-card' }, [
      createElement('h3', { textContent: recipe.strMeal }),
      createElement('img', {
        src: recipe.strMealThumb,
        alt: recipe.strMeal,
        style: 'max-width: 200px; height: auto;',
      }),
      createElement('p', {
        textContent: recipe.strInstructions,
        className: 'recipe-instructions',
      }),
    ]);

    favoritesSection.appendChild(recipeCard);
  });

  if (favorites.length === 0) {
    favoritesSection.appendChild(
      createElement('p', { textContent: 'Your favorite recipes list is empty' })
    );
  }

  return createElement('div', {}, [title, favoritesSection]);
}

export default FavoriteRecipesView;
