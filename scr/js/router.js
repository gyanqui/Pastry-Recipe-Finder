import { createElement } from './utils';
import HomeView from './HomeView';
import FavoriteRecipesView from './CategoryView.js';
import RecipeView from './RecipesView';

export function initRouter(mainView) {
  function updateView(newView) {
    mainView.innerHTML = '';
    mainView.appendChild(newView);
  }

  function hashToRoute(hash) {
    switch (hash) {
      case '#/home':
        updateView(HomeView());
        break;
      case '#/recipes':
        updateView(RecipeView());
        break;
      case '#/favoriterecipes':
        updateView(FavoriteRecipesView());
        break;
      default:
        updateView(createElement('h3', { textContent: '404 Page Not Found' }));
        break;
    }
  }

  const defaultHash = window.location.hash || '#/home';
  hashToRoute(defaultHash);

  window.addEventListener('hashchange', (evt) => {
    const newUrl = new URL(evt.newURL);
    const hash = newUrl.hash;
    hashToRoute(hash);
  });
}
