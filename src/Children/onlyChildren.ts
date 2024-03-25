import { ChildrenNotOnlyOneElementError } from '../errors';
import { ReflowNode } from '../types';
import { toArrayChildren } from './toArrayChildren';

export function onlyChildren<C>(children: C): C extends any[] ? never : C {
  const arr = toArrayChildren(<ReflowNode>children);
  if (arr.length <= 0 || arr.length > 1) throw new ChildrenNotOnlyOneElementError();
  return arr[0] as any;
}
