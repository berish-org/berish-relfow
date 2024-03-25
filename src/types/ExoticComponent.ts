import { ReflowNode } from './ReflowNode';

export interface ExoticComponent<P = {}> {
  (props: P): ReflowNode;
}
