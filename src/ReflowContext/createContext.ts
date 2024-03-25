import { Context } from '../types';
import { createContextConsumer } from './createContextConsumer';
import { createContextProvider } from './createContextProvider';
import { ReflowContextManager } from './ReflowContextManager';

export function createContext<T>(value?: T): Context<T> {
  const context: Context<T> = {
    Provider: null,
    Consumer: null,
  };

  ReflowContextManager.registerContextDefaultValue(context, value);

  context.Provider = createContextProvider(context);
  context.Consumer = createContextConsumer(context);

  return context;
}
