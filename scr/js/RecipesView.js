import { createElement } from './utils';
import { getFeaturedRecipes, getRecipeDetails } from './APIHandler';

function RecipesView() {
  const title = createElement('h2', {
    textContent: 'Explore All Our Recipes',
    className: 'RV-title',
  });
  const recipesSection = createElement('div', {
    className: 'RV-recipes-section',
  });

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

        const recipeCard = createElement(
          'div',
          { className: 'RV-recipe-card' },
          [
            createElement('h3', {
              textContent: recipe.strMeal,
              className: 'RV-recipe-title',
            }),
            createElement('img', {
              src: recipe.strMealThumb,
              alt: recipe.strMeal,
              className: 'RV-recipe-image',
            }),
            createElement('button', {
              className: 'favorite-btn',
              innerHTML: '&#10084;', // Heart icon
              onclick: (event) => toggleFavorite(recipe, event.target),
            }),
            createElement('p', {
              textContent: 'Ingredients: ',
              className: 'RV-ingredientH',
            }),
            createElement(
              'ul',
              {},
              ingredientsList.map((ingredient) =>
                createElement('li', {
                  textContent: ingredient,
                  className: 'RV-ingredient-item',
                })
              )
            ),
            createElement('p', {
              textContent: recipe.strInstructions,
              className: 'RV-recipe-instructions',
            }),
          ]
        );

        recipesSection.appendChild(recipeCard);
      });
    });
  });

  return createElement('div', {}, [title, recipesSection]);
}

function toggleFavorite(recipe, button) {
  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const isFavorite = favorites.some((fav) => fav.idMeal === recipe.idMeal);

  if (isFavorite) {
    favorites = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
  } else {
    favorites.push(recipe);
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));
  button.classList.add('shake');
  setTimeout(() => button.classList.remove('shake'), 500);
}

export default RecipesView;
