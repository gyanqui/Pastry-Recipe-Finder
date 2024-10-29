import { createElement } from './utils';
import { getFeaturedRecipes, getRecipeDetails } from './APIHandler';

function RecipesView() {
  const title = createElement('h2', { textContent: 'Explore All Our Recipes' });
  const recipesSection = createElement('div', { className: 'recipes-section' });

  getFeaturedRecipes().then((recipes) => {
    const recipesPromises = recipes.map((recipe) =>
      getRecipeDetails(recipe.idMeal)
    );

    Promise.all(recipesPromises).then((detailedRecipes) => {
      detailedRecipes.forEach((recipe) => {
        const ingredientsList = Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient') && recipe[key])
          .map(
            (key) => `${recipe[key]}: ${recipe['strMeasure' + key.slice(13)]}`
          )
          .filter((ingredient) => ingredient.split(': ')[1] !== '');

        const recipeCard = createElement('div', { className: 'recipe-card' }, [
          createElement('h3', { textContent: recipe.strMeal }),
          createElement('img', {
            src: recipe.strMealThumb,
            alt: recipe.strMeal,
            style: 'max-width: 200px; height: auto;',
          }),
          createElement('button', {
            className: 'favorite-btn',
            innerHTML: '&#10084;', // Heart icon
            onclick: () => toggleFavorite(recipe),
          }),
          createElement('p', {
            textContent: 'Ingredients: ' ,
            className: 'ingredientH',
          }),
          createElement(
            'ul',
            {},
            ingredientsList.map((ingredient) =>
              createElement('li', { textContent: ingredient })
            )
          ),
          createElement('p', {
            textContent: recipe.strInstructions,
            className: 'recipe-instructions',
          }),
        ]);

        recipesSection.appendChild(recipeCard);
      });
    });
  });

  return createElement('div', {}, [title, recipesSection]);
}

function toggleFavorite(recipe) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
    favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
  } else {
    favorites.push(recipe);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

export default RecipesView;
