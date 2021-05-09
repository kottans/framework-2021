let Component, Target;

export default function renderApp(componentFunction, targetElementId) {
  if (componentFunction) Component = componentFunction;
  if (targetElementId) Target = targetElementId;
  document.getElementById(Target).innerHTML = `
        ${Component()}
    `;
}
