import { ReflowElement } from '../types';

export function isElement(value: any): value is ReflowElement {
  if (typeof value !== 'object') return false;
  if (!value) return false;

  const hasType = 'type' in value && typeof value.type === 'function';
  const hasProps = 'props' in value && typeof value.props === 'object';

  return hasType && hasProps;
}
