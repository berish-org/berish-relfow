import { useReflowHook } from '../ReflowHook';
import { useReflowOwner } from '../ReflowOwner';

export type Reducer<S, A> = (prevState: S, action: A) => S;
export type ReducerState<R extends Reducer<any, any>> = R extends Reducer<infer S, any> ? S : never;
export type ReducerAction<R extends Reducer<any, any>> = R extends Reducer<any, infer A> ? A : never;
export type Dispatch<A> = (value: A) => void;

interface UseReducerState<T extends Reducer<any, any>> {
  state: ReducerState<T>;
  dispatch: Dispatch<ReducerAction<T>>;
}

const USE_REDUCER_HOOK = Symbol('USE_REDUCER_HOOK');

export function useReducer<R extends Reducer<any, any>, I>(reducer: R, initializerArg: I, initializer?: (arg: I) => ReducerState<R>): [ReducerState<R>, Dispatch<ReducerAction<R>>];
export function useReducer<R extends Reducer<any, any>>(reducer: R, initializerArg: ReducerState<R>): [ReducerState<R>, Dispatch<ReducerAction<R>>];
export function useReducer<R extends Reducer<any, any>, I>(reducer: R, initializerArg: I | ReducerState<R>, initializer?: (arg: I) => ReducerState<R>): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const owner = useReflowOwner();

  const hook = useReflowHook<UseReducerState<R>>(USE_REDUCER_HOOK, () => {
    let state: ReducerState<R> = typeof initializer === 'function' ? initializer(initializerArg) : (initializerArg as ReducerState<R>);

    const dispatch: Dispatch<ReducerAction<R>> = action => {
      const newState = reducer(state, action);
      if (!Object.is(state, newState)) {
        state = newState;
        hook.state.state = newState;

        owner.nextTickRender(true);
      }
    };

    return {
      state,
      dispatch,
    };
  });

  return [hook.state.state, hook.state.dispatch];
}
