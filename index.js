/* @jsx createElement */
/* @jsxFrag createFragment */
import { createElement, createFragment, render } from './src/framework';
import Texture from './src/components/App';
import Counter from './src/components/Counter';

const onClick = () => {
  console.log("I am clicked! Means, I'm loved!");
};
const subTitle = 'A JSX based app';

const container = document.getElementById('app-root');

const App = () => (
  <>
    <Texture
      title="Application"
      subTitle={subTitle}
      onClick={onClick}
      onInput={() => console.log('input!')}
    />
    <Counter />
  </>
);

render(App, container);
