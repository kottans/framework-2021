import App from "../components/App";

function renderApp() {
  document.getElementById('app-root').innerHTML = `
        ${App()}
    `;
}

export default renderApp;
