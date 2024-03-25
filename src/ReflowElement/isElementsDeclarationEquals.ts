import { ReflowElement } from '../types';
import { isElement } from './isElement';

export function isElementsDeclarationEquals(first: ReflowElement, second: ReflowElement): boolean {
  return isElement(first) && isElement(second) && first.key === second.key && first.type === second.type;
}
