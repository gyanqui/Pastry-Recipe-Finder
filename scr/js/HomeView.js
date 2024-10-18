// Updating the home view to include featured recipes
import { createElement } from './utils';
import { getFeaturedRecipes, getCategoryRecipes } from './APIHandler';

function HomeView() {
  const hero = createElement('img', {
    src: './src/images/placeholder.png',
    alt: 'PastryPal Hero Image',
  });
  const title = createElement('h2', { textContent: 'Get to Know US!' });
  const intro = createElement('p', {
    textContent:
      "Welcome to PastryPal, your go-to source for delightful pastry recipes! Based in the heart of the baking community, PastryPal is dedicated to helping you discover the joy of homemade baked goods. From flaky croissants to rich, decadent cakes, our mission is to provide you with easy-to-follow recipes, sourced from renowned bakers and curated for every skill level. Whether you're a seasoned baker or just starting out, our collection features a variety of delicious options, including gluten-free, vegan, and classic pastries. At PastryPal, we believe that baking should be accessible, fun, and rewarding—a way to bring loved ones together, one pastry at a time. Come explore, create, and share the love of baking with us!",
  });

  const featuredSection = createElement('div', {
    className: 'featured-section',
  });

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

  return createElement('div', {}, [hero, title, intro, featuredSection]);
}

export default HomeView;
