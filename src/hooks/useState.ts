import { useCallback } from './useCallback';
import { useReducer } from './useReducer';

export function useState<T>(initialValue?: T | (() => T)): [state: T, setState: (state: T | ((prevState: T) => T)) => void] {
  const [state, dispatch] = useReducer<(state: T, action: { type: 'set'; value: (prevState: T) => T }) => T, undefined>(
    (state, action) => {
      if (action.type === 'set') return action.value(state);
      return state;
    },
    undefined,
    () => (typeof initialValue === 'function' ? (initialValue as Function)() : initialValue),
  );

  const setState = useCallback(
    (value: T | ((prevState: T) => T)) => {
      dispatch({ type: 'set', value: typeof value === 'function' ? (value as (prevState: T) => T) : () => value });
    },
    [dispatch],
  );

  return [state, setState];
}
