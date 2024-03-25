import { Hook } from '../types';
import { ReflowHookManager } from './ReflowHookManager';

export function useReflowHook<T>(type: string | symbol, factory: () => T): Hook<T> {
  const hookManager = ReflowHookManager.getFromContext();
  return hookManager.use(type, factory);
}
