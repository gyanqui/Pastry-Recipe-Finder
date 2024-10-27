import { createElement } from './utils';
import { getFeaturedRecipes, getRecipeDetails } from './APIHandler';
import SugarTreatsView from './SugarTreatsView';
import FreeSugarView from './FreeSugarView'; // Import FreeSugarView

function CategoryView() {
  const title = createElement('h2', { textContent: 'Recipe Categories' });
  const categorySection = createElement('div', {
    className: 'category-section',
  });

  getFeaturedRecipes().then((recipes) => {
    const groupedCategories = {
      withSugar: [],
      withoutSugar: [],
    };

    const recipeDetailsPromises = recipes.map((recipe) =>
      getRecipeDetails(recipe.idMeal)
    );

    Promise.all(recipeDetailsPromises).then((detailedRecipes) => {
      detailedRecipes.forEach((recipe) => {
        const ingredients = Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient'))
          .map((key) => recipe[key]?.toLowerCase());

        if (ingredients.some((ingredient) => ingredient?.includes('sugar'))) {
          groupedCategories.withSugar.push(recipe);
        } else {
          groupedCategories.withoutSugar.push(recipe);
        }
      });

      const categoryGroups = [
        { name: 'Sugar Treats', categories: groupedCategories.withSugar },
        { name: 'Free Sugar', categories: groupedCategories.withoutSugar },
      ];

      categoryGroups.forEach((group) => {
        if (group.categories.length > 0) {
          const groupTitle = createElement('h3', { textContent: group.name });
          const groupImage = createElement('img', {
            src: group.categories[0].strMealThumb,
            alt: group.name,
          });

          const groupContainer = createElement(
            'div',
            { className: 'category-group' },
            [groupTitle, groupImage]
          );

          if (group.name === 'Sugar Treats') {
            groupContainer.addEventListener('click', () => {
              SugarTreatsView(group.categories, group.name);
            });
          } else if (group.name === 'Free Sugar') {
            groupContainer.addEventListener('click', () => {
              FreeSugarView(group.categories, group.name);
            });
          }

          categorySection.appendChild(groupContainer);
        }
      });
    });
  });

  return createElement('div', {}, [title, categorySection]);
}

export default CategoryView;
