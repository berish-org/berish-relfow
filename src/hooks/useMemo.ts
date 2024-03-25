import { DependencyListDeclarationIsNotCorrect } from '../errors';
import { useReflowHook } from '../ReflowHook';
import { DependencyList } from '../types';
import { isDependencyListDeclarationCorrect, isDependencyListDeclarationUpdated } from '../utils';

interface UseMemoState<T> {
  depsList: DependencyList;
  value: T;
}

const USE_MEMO_HOOK = Symbol('USE_MEMO_HOOK');

export function useMemo<T>(callback: () => T, depsList: DependencyList): T {
  if (!isDependencyListDeclarationCorrect(depsList)) throw new DependencyListDeclarationIsNotCorrect('useMemo');

  const hook = useReflowHook<UseMemoState<T>>(USE_MEMO_HOOK, () => ({ depsList, value: callback() }));

  if (isDependencyListDeclarationUpdated(hook.state.depsList, depsList, USE_MEMO_HOOK)) {
    hook.state.depsList = depsList;
    hook.state.value = callback();
  }
  return hook.state.value;
}
