// Тег может быть как строкой, так и функцией – если парсим

import { createElement } from '../ReflowElement';
import { Attributes, FunctionComponent, ReflowNode } from '../types';

export function h<P extends {}>(type: FunctionComponent<P>, props?: (Attributes & P) | null, ...children: ReflowNode[]) {
  if (typeof type === 'function') return createElement(type, props, ...children);
  throw new TypeError('Reflow not supported custom tags.');
}
