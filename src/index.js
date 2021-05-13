import { render } from './framework';
import App from './components/App';

if (module.hot) {
  module.hot.accept();
}

// pass a component function itself so that `render` could invoke it as needed
render(App, document.getElementById('app-root'));
