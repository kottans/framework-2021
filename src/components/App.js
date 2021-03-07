/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from "../framework/element";

const SearchBar = ({onInput, searchProps}) => (
  <>
    <input type="text" onInput={onInput} value={searchProps.value} />
    <button type={searchProps.type} onClick={onInput}>Search {searchProps.value}</button>
  </>
);
const searchProps = {
  value: "Kyiv",
  type: "button",
};

const TypeWriter = ({children}) => <pre>{children}</pre>;

const Cards = ({children}) => <><h3>Cards</h3><ul>{children.map(child => (<li>{child}</li>))}</ul></>;
const cards = ['c0', 'c1'];

const Card = ({name}) => `Card ${name}`;

const App = ({title, subTitle, onInput, onClick}) => {
  return (
    <>
      <h1>{title}</h1>
      <h2>{subTitle}</h2>
      <button type="button" onClick={onClick}>CLICK ME</button>
      <ul>{[1,2,3].map(n => (<li>{n}</li>))}</ul>
      <SearchBar onInput={onInput} searchProps={searchProps} />
      <hr/>
      <TypeWriter>{`
        Heading A | Heading B | Heading C
        --------- | --------- | ---------
        row 1     |   123     |   abc
        row 2     |   456     |   def`}
      </TypeWriter>
      <hr/>
      <Cards cards={cards}>
        The Cards
        <Card name="AA" />
        <Card name="BB" />
        No more cards
      </Cards>
    </>
  );
}

export default App;
