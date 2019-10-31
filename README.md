<h1 align="center">React MicroDux</h1>
<p align="center">A small library to help create mini local reducer-like states for components to hopefully delay the need for redux in a react project.<p>
<p align="center"><a href="https://github.com/kalvinpearce/react-microdux/actions?query=workflow%3A%22Node+CI%22"><img src="https://github.com/kalvinpearce/react-microdux/workflows/Node%20CI/badge.svg" /></a></p>

### Why?
The idea is to _reduce_ the amount of boilerplate code required to set up complex local state.

In vanilla react to use a reducer you would normally define:

- Action constants - `const addAction = 'AddAction';`
- Action creator - `const add = (value: number) => {type: addAction, payload: value};`
- Reducer - `const reducer = (state, action) => { switch(action.type) ... };`
- UseReducer - `const [state, dispatch] = useReducer(initialState, reducer);`

All just to have multiple mutations happen to the state with one action.

With React MicroDux all you have to do is define the initial state and a function
for each mutation you wish to perform on the state.

### Usage

`useMicroDux()` takes an initial state and an object of functions that modify the state.
It returns an object that contains the state and a dispatch object with each action function.

### Example

```tsx
import * as React from 'react';
import { useMicroDux } from './index';

const Component = () => {
  const dux = useMicroDux(
    // Initial State
    { a: 1 },
    // State update functions
    {
      Add: (state, payload: number) => ({
        ...state,
        a: state.a + payload,
      }),
      MinusOne: (state, payload: undefined) => ({
        ...state,
        a: state.a - 1,
      }),
    },
  );

  return (
    <div>
      <h1>Test Dux Component</h1>
      <span>{dux.state.a}</span>
      <button onClick={() => dux.dispatch.Add(1)}>Increment</button>
      <button onClick={() => dux.dispatch.MinusOne()}>Decrement</button>
    </div>
  );
};
```
