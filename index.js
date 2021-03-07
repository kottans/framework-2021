/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from "./src/framework/element";
import App from "./src/components/App";

const onClick = () => { console.log("I am clicked! Means, I'm loved!"); };
const subTitle = "A JSX based app";

setTimeout(() =>
  document.getElementById("app-root")
    .replaceWith(<App title="Application" subTitle={subTitle} onClick={onClick} onInput={() => console.log("input!")}  />)
  , 300);
