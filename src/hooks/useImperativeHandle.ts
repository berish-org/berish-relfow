import { ReflowOwner } from '../ReflowOwner';
import { DependencyList, Ref } from '../types';
import { useLayoutEffect } from './useLayoutEffect';

export function useImperativeHandle<T, R extends T>(ref: Ref<T> | undefined, init: () => R, deps?: DependencyList): void {
  return useLayoutEffect(() => {
    if (ref) {
      const refData = init();

      if (typeof ref === 'function') {
        ref(refData);
      } else if (typeof ref === 'object') {
        const prevValue = ref.current;
        Object.defineProperty(ref, 'current', { value: refData });

        const owner = ReflowOwner.getFromRef(ref);
        if (owner && !Object.is(prevValue, ref.current)) {
          owner.render(true);
        }
      }
    }
  }, deps);
}
