import { createElement } from './utils';

function Page3() {
  const title = createElement('h2', { textContent: 'Page 3' });

  const page1Link = createElement('a', {
    href: '/#/page1',
    textContent: 'Link to Page 1',
  });

  return createElement('div', {}, [title, page1Link]);
}

export default Page3;