import { DependencyListDeclarationIsNotEqualsCorrect } from '../errors';
import { useReflowEmitter } from '../ReflowEmitter';
import { useReflowHook } from '../ReflowHook';
import { DependencyList } from '../types';
import { isDependencyListDeclarationCorrect, isDependencyListDeclarationUpdated } from '../utils';

const USE_LAYOUT_EFFECT = Symbol('USE_LAYOUT_EFFECT');

interface UseLayoutEffectState {
  depsList: DependencyList | null;
  unmount: void | (() => void);
}

export function useLayoutEffect(callback: () => void | (() => void), depsList?: DependencyList): void {
  if (!isDependencyListDeclarationCorrect(depsList)) throw new DependencyListDeclarationIsNotEqualsCorrect(USE_LAYOUT_EFFECT);

  const emitter = useReflowEmitter();
  const hook = useReflowHook<UseLayoutEffectState>(USE_LAYOUT_EFFECT, () => {
    const unmount = callback();

    emitter.on('unmounted', () => {
      if (hook.state.unmount) {
        hook.state.unmount();
        hook.state.unmount = null;
      }
    });

    return { depsList, unmount };
  });

  if (isDependencyListDeclarationUpdated(hook.state.depsList, depsList, 'useLayoutEffect')) {
    hook.state.depsList = depsList;

    if (hook.state.unmount) {
      hook.state.unmount();
      hook.state.unmount = null;
    }

    hook.state.unmount = callback();
  }
}
