import { useReflowContextManager } from '../ReflowContext/useReflowContextManager';
import { Context } from '../types';
import { useEffect } from './useEffect';
import { useState } from './useState';

export function useContext<T>(context: Context<T>): T {
  const contextManager = useReflowContextManager();
  const [value, setValue] = useState<T>(contextManager.getValue(context));

  useEffect(() => contextManager.listen(context, (value) => setValue(value)), [contextManager, context]);

  return value;
}
