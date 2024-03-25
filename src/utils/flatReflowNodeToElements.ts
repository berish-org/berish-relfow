import LINQ from '@berish/linq';

import { isElement } from '../ReflowElement';
import { ReflowElement, ReflowNode } from '../types';

export function flatReflowNodeToElements(node: ReflowNode | ReflowNode[]): ReflowElement[] {
  const nodes = Array.isArray(node) ? node : [node];

  return LINQ.from(nodes)
    .selectMany(node => {
      if (typeof node === 'boolean') return void 0;
      if (typeof node === 'undefined') return void 0;
      if (node === null) return void 0;

      if (Array.isArray(node)) return flatReflowNodeToElements(node);
      if (isElement(node)) return [node];

      return void 0;
    })
    .filter(Boolean)
    .toArray();
}
