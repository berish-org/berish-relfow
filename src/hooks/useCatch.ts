import { useReflowEmitter } from '../ReflowEmitter';
import { useReflowHook } from '../ReflowHook';

interface UseCatchState {
  error: unknown;
}

const USE_CATCH_HOOK = Symbol('USE_CATCH_HOOK');

export function useCatch(callback?: (err: unknown) => any) {
  const emitter = useReflowEmitter();
  const hook = useReflowHook<UseCatchState>(USE_CATCH_HOOK, () => {
    emitter.on('error', err => {
      if (typeof callback === 'function') {
        try {
          callback(err);
        } catch (err2) {
          hook.state.error = err2;
        }
      } else {
        hook.state.error = err;
      }
    });

    return { error: void 0 };
  });

  return hook.state.error;
}
