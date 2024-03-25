import { ReflowContextManager } from './ReflowContextManager';

export function useReflowContextManager() {
  return ReflowContextManager.getFromContext();
}
