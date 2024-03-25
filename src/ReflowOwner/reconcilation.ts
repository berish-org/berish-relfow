import { isElementsDeclarationEquals } from '../ReflowElement';
import { ReconcilationMutation, ReflowElement } from '../types';

export function reconciliation(prevElements: ReflowElement[], newElements: ReflowElement[]): ReconcilationMutation[] {
  prevElements = prevElements.slice();
  newElements = newElements.slice();

  const mutations: ReconcilationMutation[] = [];

  // Upsert
  for (const element of newElements) {
    const prevElement = prevElements.find((prev) => isElementsDeclarationEquals(prev, element));

    if (!prevElement) {
      mutations.push({ type: 'mount', element });
    } else {
      mutations.push({ type: 'update', prevElement, newElement: element });
    }
  }

  // Unmount
  const unmountElements = prevElements.filter((prevElement) => newElements.findIndex((newElement) => isElementsDeclarationEquals(prevElement, newElement)) === -1);
  for (const element of unmountElements) {
    mutations.push({ type: 'unmount', element });
  }

  return mutations;
}
