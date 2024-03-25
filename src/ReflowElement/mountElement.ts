import { ReflowOwner } from '../ReflowOwner';
import { ReflowElement } from '../types';

export function mountElement(element: ReflowElement) {
  const owner = ReflowOwner.getFromElement(element) || ReflowOwner.createOwnerFromElement(element);
  owner.mount();

  return owner;
}
