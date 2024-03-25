import { ReflowNode } from '../types';
import { flatReflowNodeToElements } from '../utils';

export function toArrayChildren(children: ReflowNode | ReflowNode[]): Exclude<ReflowNode, boolean | null | undefined>[] {
  return flatReflowNodeToElements(children);
}
