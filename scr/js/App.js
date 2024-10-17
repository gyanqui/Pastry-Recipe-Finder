import { createElement } from './utils';
import { initRouter } from './router';
import HomeView from './HomeView';
import CategoryView from './CategoryView';

function Header(mainDiv) {
  const appTitle = createElement('h1', {
    textContent: 'PastryPal',
    className: 'heading',
  });

  // nav items
  const homeLink = createElement('a', {
    href: '#/home',
    textContent: 'Home',
  });
  const categoryLink = createElement('a', {
    href: '#/categories',
    textContent: 'Categories',
  });

  const nav = createElement('nav', {}, [homeLink, categoryLink]);

  return createElement('header', {}, [appTitle, nav]);
}

function Footer() {
  const copyright = createElement('span', {
    textContent: `Copyright © ${new Date().getFullYear()}`,
  });

  return createElement('footer', {}, [copyright]);
}

function App() {
  const main = createElement('main', {}, []);

  initRouter(main);

  return createElement('div', {}, [Header(main), main, Footer()]);
}

export default App;
