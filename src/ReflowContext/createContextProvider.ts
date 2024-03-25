import { useLayoutEffect } from '../hooks';
import { Context, Provider } from '../types';
import { useReflowContextManager } from './useReflowContextManager';

export function createContextProvider<T>(context: Context<T>): Provider<T> {
  return (props) => {
    const contextManager = useReflowContextManager();

    useLayoutEffect(() => {
      contextManager.setValue(context, props.value);
    }, [context, props.value]);

    return props.children;
  };
}
