// Updating the home view to include featured recipes
import { createElement } from './utils';
import { getFeaturedRecipes, getCategoryRecipes } from './APIHandler';

function HomeView() {
  const title = createElement('h2', { textContent: 'Welcome to PastryPal' });
  const intro = createElement('p', { textContent: 'Find the best pastry recipes based on your ingredients and dietary preferences.' });

  const featuredSection = createElement('div', { className: 'featured-section' });
  const featuredTitle = createElement('h3', { textContent: 'Featured Recipes' });

  getFeaturedRecipes().then((recipes) => {
    // Randomly select up to 4 recipes
    const selectedRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 4);
    const recipeList = selectedRecipes.map((recipe) =>
      createElement('div', { className: 'recipe-card' }, [
        createElement('h4', { textContent: recipe.strMeal }),
        createElement('img', { src: recipe.strMealThumb, alt: recipe.strMeal }),
      ])
    );
    featuredSection.append(...recipeList);
  });

  return createElement('div', {}, [title, intro, featuredTitle, featuredSection]);
}

export default HomeView;