import { Action, useMicroDux } from '../index';

const initialState = {
    a: 1,
    b: 2,
    c: 'three',
};
type State = typeof initialState;

const addOneToA: Action<State, undefined> = (state, payload) => ({
    ...state,
    a: state.a + 1,
});

describe('useMicroDux', () => {
    it('has not had tests created yet', () => {
        expect(true);
    });
    // it('calls a function on it', () => {
    //     const dux = useMicroDux(initialState, {
    //         Add: (state, payload: undefined) => ({
    //             ...state,
    //             a: state.a + 1,
    //         }),
    //         addOneToA,
    //     });

    //     dux.dispatch.addOneToA();

    //     expect(dux.state.a).toBe(2);
    // });
});
