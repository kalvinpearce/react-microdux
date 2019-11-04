import { useReducer } from 'react';

export type Action<State, Payload = undefined> = (
  state: State,
  payload?: Payload,
) => State;
interface IActionsMap<State> {
  [keys: string]: Action<State>;
}
interface IReducerAction {
  type: string;
  payload: any;
}

type ExtractPayload<T extends Action<any>> = T extends Action<any, infer P>
  ? P
  : never;

export const useMicroDux = <State, ActionsMap extends IActionsMap<State>>(
  initialState: State,
  actions: ActionsMap,
) => {
  // Create reducer to run action's state update
  const reducer = (state: State, action: IReducerAction) => {
    const foundAction = actions[action.type];
    if (action.payload !== undefined) {
      return foundAction(state, action.payload);
    }
    return foundAction(state);
  };

  // Create a reducer for state management
  const [store, dispatch] = useReducer(reducer, initialState);

  // Generate a type for the actions object
  // This type ensures that the function for each action requires the
  // correct payload
  type ActionMapType = {
    [key in keyof typeof actions]: ExtractPayload<
      typeof actions[key]
    > extends undefined
      ? () => void
      : (payload: ExtractPayload<typeof actions[key]>) => void;
  };

  // Map actions object to an object of dispatch actions
  // These can be called with their payload and will dispatch state updates
  const mappedActions = Object.keys(actions).reduce(
    (prev, currentElem) => ({
      ...prev,
      [currentElem]: (payload: any) => dispatch({ type: currentElem, payload }),
    }),
    {} as ActionMapType,
  );

  return {
    dispatch: mappedActions,
    state: store,
  };
};
