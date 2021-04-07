let appComponent;

export function renderApp(AppComponent) {
  if (AppComponent) appComponent = AppComponent;
  document.getElementById('app-root').innerHTML = `
    ${appComponent()}
  `;
}
