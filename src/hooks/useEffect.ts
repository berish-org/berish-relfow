import { DependencyListDeclarationIsNotCorrect } from '../errors';
import { useReflowEmitter } from '../ReflowEmitter';
import { useReflowHook } from '../ReflowHook';
import { DependencyList } from '../types';
import { isDependencyListDeclarationCorrect, isDependencyListDeclarationUpdated } from '../utils';

interface UseEffectState {
  depsList: DependencyList | null;
  unmount: void | (() => void);
}

const USE_EFFECT_HOOK = Symbol('USE_EFFECT_HOOK');

export function useEffect(callback: () => void | (() => void), depsList?: DependencyList) {
  if (!isDependencyListDeclarationCorrect(depsList)) throw new DependencyListDeclarationIsNotCorrect('useEffect');

  const emitter = useReflowEmitter();

  const hook = useReflowHook<UseEffectState>(USE_EFFECT_HOOK, () => {
    emitter.on('mounted', () => {
      const unmount = callback();

      hook.state.unmount = unmount;
      hook.state.depsList = depsList;
    });

    emitter.on('unmounted', () => {
      if (hook.state.unmount) {
        hook.state.unmount();
        hook.state.unmount = null;
      }
    });

    return { depsList, unmount: null };
  });

  if (isDependencyListDeclarationUpdated(hook.state.depsList, depsList)) {
    hook.state.depsList = depsList;

    if (hook.state.unmount) {
      hook.state.unmount();
      hook.state.unmount = null;
    }

    hook.state.unmount = callback();
  }
}
