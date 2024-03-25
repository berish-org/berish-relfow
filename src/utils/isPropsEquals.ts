import LINQ from '@berish/linq';

import { isNil } from './isNil';
import { isReflowNode } from './isReflowNode';
import { isReflowNodesEquals } from './isReflowNodesEquals';

export function isPropsEquals(first: any, second: any): boolean {
  first = first || {};
  second = second || {};

  const keys = LINQ.from(Object.keys(first)).concat(Object.keys(second)).distinct().toArray();

  return keys.every((key) => {
    const firstV = first[key];
    const secondV = second[key];

    if (isNil(firstV)) return isNil(secondV);
    if (isReflowNode(firstV)) return isReflowNode(secondV) && isReflowNodesEquals(firstV, secondV);

    return Object.is(firstV, secondV);
  });
}
