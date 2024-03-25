import { isElement, isElementsEquals } from '../ReflowElement';
import { ReflowNode } from '../types';
import { isNil } from './isNil';

export function isReflowNodesEquals(first: ReflowNode, second: ReflowNode): boolean {
  if (typeof first === 'boolean') return typeof second === 'boolean' && Boolean(first) === Boolean(second);
  if (isNil(first)) return isNil(second);
  if (Array.isArray(first)) return Array.isArray(second) && first.length === second.length && first.every((first, index) => isReflowNodesEquals(first, second[index]));
  if (isElement(first)) return isElement(second) && isElementsEquals(first, second);

  return Object.is(first, second);
}
