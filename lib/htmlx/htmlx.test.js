import htmlx from "./htmlx";
import render from "./render";

const SearchBar = ({searchProps, onInput}) =>
  htmlx`<p><input type="text" value="${searchProps.value}" /><button type="${searchProps.type}" onInput="${onInput}" /></p>`;

const Cards = ({children}) =>
  htmlx`<ul>${children}</ul>`;

const Card = ({name, idx}) =>
  htmlx`<li>${idx}: ${name}</li>`;

const TypeWriter = ({children}) =>
  htmlx`<pre>${children}</pre>`;

const Box = ({children}) =>
  htmlx`<div>${children}</div>`;

const title = "Page title";

const cards = ['c0', 'c1'] ;

const searchProps = {
  value: "Kyiv",
  type: "button",
};


const handleSearch = (e) => { console.log(e); };

const page = htmlx`
  <main title="${title}" subtitle="Main content">
   <h1>Hello</h1>
   <div>
     <input type="text" />
     <${SearchBar} searchProps="${searchProps}" onInput="${handleSearch}" />
     <hr />
     <${Cards} cards="${cards}">
      The Cards
      <${Card} name="AA" />
      <${Card} name="BB" />
      No more cards 
     </${Cards}>
   </div>
   <${TypeWriter}>
    Heading A | Heading B | Heading C
    --------- | --------- | ---------
    row 1     |   123     |   abc
    row 2     |   456     |   def   
   </${TypeWriter}>
   <${Box}>
     Outer box
     <${Box}>
       Inner box   
     </${Box}>   
   </${Box}>
  </main>
  <footer>Footer</footer>
`;

render(document.getElementById("app"), page);

/* const df1 = new DocumentFragment();
const el11 = document.createElement("div");
el11.innerHTML = 'ABC';
const el12 = document.createElement("div");
el12.innerHTML = 'def';

df1.append(el11, el12);

const df2 = new DocumentFragment();
const el21 = document.createElement("div");
el21.innerHTML = '<input type="text">';

df2.append(df1, el21);

document.getElementById("app").replaceChildren(df2);
*/

