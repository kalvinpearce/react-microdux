import { configure, mount } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { useMicroDux } from './index';
import { ActionWithoutPayload } from './useMicroDux';

configure({ adapter: new Adapter() });

const initialState = {
  a: 1,
};

const addAction: ActionWithoutPayload<typeof initialState> = state => ({
  ...state,
  a: state.a + 1,
});

const Component = () => {
  const dux = useMicroDux(initialState, {
    Add: addAction,
    Subtract: (state, payload: number) => ({
      ...state,
      a: state.a - payload,
    }),
  });

  return (
    <div>
      <h1>Test Dux Component</h1>
      <span>{dux.state.a}</span>
      <button onClick={() => dux.dispatch.Add()}>Increment</button>
      <input
        type="button"
        value="Decrement"
        onClick={() => dux.dispatch.Subtract(1)}
      />
    </div>
  );
};

describe('useMicroDux', () => {
  it('renders', () => {
    mount(<Component />);
  });

  it('displays initial state of 1', () => {
    const wrapper = mount(<Component />);
    const span = wrapper.find('span');
    expect(span.text()).toEqual('1');
  });

  it('does not displays initial state of 2', () => {
    const wrapper = mount(<Component />);
    const span = wrapper.find('span');
    expect(span.text()).not.toEqual('2');
  });

  it('displays state of 2 after click Increment', () => {
    const wrapper = mount(<Component />);
    const button = wrapper.find('button');
    button.simulate('click');
    const span = wrapper.find('span');
    expect(span.text()).toEqual('2');
  });

  it('displays state of 0 after click Decrement', () => {
    const wrapper = mount(<Component />);
    const button = wrapper.find('input');
    button.simulate('click');
    const span = wrapper.find('span');
    expect(span.text()).toEqual('0');
  });
});
