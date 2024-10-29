import { createElement } from './utils';

function FavoriteRecipesView() {
  const title = createElement('h2', { textContent: 'Your Favorite Recipes ' });
  const favoritesSection = createElement('div', {
    className: 'favorites-section',
  });

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  favorites.forEach((recipe) => {
    const ingredientsList = Object.keys(recipe)
      .filter((key) => key.startsWith('strIngredient') && recipe[key])
      .map((key) => `${recipe[key]}: ${recipe['strMeasure' + key.slice(13)]}`)
      .filter((ingredient) => ingredient.split(': ')[1] !== '');

    const recipeCard = createElement(
      'div',
      { className: 'recipe-card favorite-card' },
      [
        createElement('h3', { textContent: recipe.strMeal }),
        createElement('button', {
          textContent: 'X',
          className: 'remove-button',
          onclick: () => {
            removeFavorite(recipe.idMeal);
          },
        }),
        createElement('img', {
          src: recipe.strMealThumb,
          alt: recipe.strMeal,
        }),
        createElement('p', {
          textContent: 'Ingredients:',
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
      ]
    );

    favoritesSection.appendChild(recipeCard);
  });

  if (favorites.length === 0) {
    favoritesSection.appendChild(
      createElement('p', {
        textContent: 'You do not have favorites recipes 😞',
      })
    );
  }

  function removeFavorite(idMeal) {
    favorites = favorites.filter((recipe) => recipe.idMeal !== idMeal);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    favoritesSection.innerHTML = '';
    favorites.forEach((recipe) => {
      const ingredientsList = Object.keys(recipe)
        .filter((key) => key.startsWith('strIngredient') && recipe[key])
        .map((key) => `${recipe[key]}: ${recipe['strMeasure' + key.slice(13)]}`)
        .filter((ingredient) => ingredient.split(': ')[1] !== '');

      const recipeCard = createElement('div', { className: 'recipe-card' }, [
        createElement('h3', { textContent: recipe.strMeal }),
        createElement('img', {
          src: recipe.strMealThumb,
          alt: recipe.strMeal,
        }),
        createElement('p', {
          textContent: 'Ingredients:',
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
        createElement('button', {
          textContent: 'X',
          className: 'remove-button',
          onclick: () => {
            removeFavorite(recipe.idMeal);
          },
        }),
      ]);

      favoritesSection.appendChild(recipeCard);
    });

    if (favorites.length === 0) {
      favoritesSection.appendChild(
        createElement('p', {
          textContent: 'You do not have favorites recipes 😞',
        })
      );
    }
  }

  return createElement('div', {}, [title, favoritesSection]);
}

export default FavoriteRecipesView;
