export async function getFeaturedRecipes() {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert'
  );
  const data = await response.json();
  return data.meals;
}

export async function getRecipeDetails(id) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await response.json();
  return data.meals[0];
}