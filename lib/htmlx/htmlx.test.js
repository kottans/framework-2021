import htmlx from "./htmlx.js";

const SearchBar = (props) => htmlx`<p><input type="text" value="${props.value}" /><button type="${props.type}"></p>`;

const Cards = ({children}) =>
  htmlx`<ul> ${children.map((child, idx) => child({idx})).join('')} </ul>`;

const Card = ({name, idx}) =>
  htmlx`<li>${idx}: ${name}</li>`;

const title = "Page title";

const cards = ['c0', 'c1'] ;

const searchProps = {
  value: "Kyiv",
  type: "button",
};


const handleSearch = (e) => {console.log(e)};

const page = htmlx`
  <main title="${title}">
   <h1>Hello</h1>
   <div>
     <input type="text" />
     <${SearchBar} ${searchProps}="default search term" onInput="${handleSearch}" />
     <hr />
     <${Cards} cards="${cards}">
      The Cards
      <${Card} name="AA" />
      <${Card} name="BB" />
      No more cards 
     </Cards>
   </div>
  </main>
  <footer>Footer</footer>
`;

console.log(page) ;
