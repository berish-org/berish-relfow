import { ExoticComponent } from './ExoticComponent';
import { ReflowNode } from './ReflowNode';

export interface ProviderProps<T> {
  value: T;
  children?: ReflowNode | undefined;
}

export interface ProviderExoticComponent<P> extends ExoticComponent<P> {}

export type Provider<T> = ProviderExoticComponent<ProviderProps<T>>;
