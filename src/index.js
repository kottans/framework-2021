import App from './components/App';
import { render } from './framework';

if (module.hot) {
  module.hot.accept();
}

// pass a component function itself so that `renderApp` could invoke it as needed
render(App, document.getElementById('app-root'));
