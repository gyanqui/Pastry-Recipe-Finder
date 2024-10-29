import { createElement } from './utils';
import { initRouter } from './router';

function Header() {
  const appTitle = createElement('h1', {
    textContent: 'PastryPal',
    className: 'heading',
  });

  // nav items
  const homeLink = createElement('a', {
    href: '#/home',
    textContent: 'Home',
  });
  const recipeLink = createElement('a', {
    href: '#/recipes',
    textContent: 'Recipes',
  });
  const favoriterecipesLink = createElement('a', {
    href: '#/favoriterecipes',
    textContent: 'Favorite Recipes',
  });

  const nav = createElement('nav', {}, [
    homeLink,
    recipeLink,
    favoriterecipesLink,
  ]);

  return createElement('header', {}, [appTitle, nav]);
}

function Footer() {
  const copyright = createElement('span', {
    textContent: `© ${new Date().getFullYear()} PastryPal`,
  });

  const footerP = createElement('p', {
    textContent: 'All rights reserves',
  });
  const lastModification = createElement('p', {
    textContent: `Last Modification: ${new Date().toLocaleString()}`,
  });

  const contactInfo = createElement('div', {}, [
    createElement('p', { textContent: 'Contact Us' }),
    createElement('p', { textContent: 'Phone: +51 916 165 703' }),
    createElement('p', { textContent: 'Email: pastrypal@gmail.com' }),
    createElement('p', {
      textContent: 'Address: 6711 Abanto St, Carlsbad, CA 92009',
    }),
  ]);

  const credit = createElement('p', {}, [
    createElement('a', {
      href: 'https://www.themealdb.com/',
      textContent: 'Themealdb',
      target: '_blank',
    }),
  ]);

  return createElement('footer', {}, [
    contactInfo,
    credit,
    copyright,
    footerP,
    lastModification,
  ]);
}

function App() {
  const main = createElement('main', {}, []);

  initRouter(main);

  return createElement('div', {}, [Header(main), main, Footer()]);
}

document.getElementById('root').appendChild(App());

export default App;
