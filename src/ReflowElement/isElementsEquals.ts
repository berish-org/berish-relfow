import { ReflowElement } from '../types';
import { isPropsEquals } from '../utils';
import { isElementsDeclarationEquals } from './isElementsDeclarationEquals';

export function isElementsEquals(first: ReflowElement, second: ReflowElement): boolean {
  return isElementsDeclarationEquals(first, second) && isPropsEquals(first.props, second.props);
}
