import { isElement } from '../ReflowElement';
import { ReflowNode } from '../types';
import { isNil } from './isNil';

export function isReflowNode(value: any): value is ReflowNode {
  if (typeof value === 'boolean') return true;
  if (isNil(value)) return true;
  if (isElement(value)) return true;
  if (Array.isArray(value)) return value.every((m) => isReflowNode(m));

  return false;
}
