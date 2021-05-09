import App from '../components/App';

export default function renderApp() {
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
}
