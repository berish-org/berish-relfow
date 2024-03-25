import { DependencyListDeclarationIsNotCorrect } from '../errors';
import { useReflowHook } from '../ReflowHook';
import { DependencyList } from '../types';
import { isDependencyListDeclarationCorrect, isDependencyListDeclarationUpdated } from '../utils';

interface UseCallbackState<T> {
  depsList: DependencyList;
  callback: T;
}

const USE_CALLBACK_HOOK = Symbol('USE_CALLBACK_HOOK');

export function useCallback<T extends Function>(callback: T, depsList: DependencyList): T {
  if (!depsList || !isDependencyListDeclarationCorrect(depsList)) throw new DependencyListDeclarationIsNotCorrect(USE_CALLBACK_HOOK);

  const hook = useReflowHook<UseCallbackState<T>>(USE_CALLBACK_HOOK, () => {
    return { depsList, callback };
  });

  if (isDependencyListDeclarationUpdated(hook.state.depsList, depsList, USE_CALLBACK_HOOK)) {
    hook.state.depsList = depsList;
    hook.state.callback = callback;
  }

  return hook.state.callback;
}
