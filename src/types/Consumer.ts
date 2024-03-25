import { ExoticComponent } from './ExoticComponent';
import { ReflowNode } from './ReflowNode';

export interface ConsumerProps<T> {
  children: (value: T) => ReflowNode;
}

export type Consumer<T> = ExoticComponent<ConsumerProps<T>>;
