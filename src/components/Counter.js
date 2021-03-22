/** @jsx createElement */
/*** @jsxFrag createFragment */
import { createElement, createFragment } from '../framework';

import { useState } from '../framework';

export default function Counter() {
  const [increment, setIncrement] = useState(1);
  const [decrement, setDecrement] = useState(10);
  return (
    <>
      <hr />
      <button
        onClick={() => {
          setIncrement((inc) => inc + 1);
        }}
        style="user-select: none"
      >
        👍🏻 Increment: <i>{increment}</i>
      </button>
      <br />
      <button
        onClick={() => {
          setDecrement((dec) => dec - 1);
        }}
        style="user-select: none"
      >
        👎🏻 Decrement: <b>{decrement}</b>
      </button>
    </>
  );
}
