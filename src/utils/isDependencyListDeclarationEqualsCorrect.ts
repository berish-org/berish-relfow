import { DependencyList } from '../types';

export function isDependencyListDeclarationEqualsCorrect(prevDepsList: DependencyList, currentDepsList: DependencyList): boolean {
  if (prevDepsList && !currentDepsList) return false;
  if (!prevDepsList && currentDepsList) return false;
  if (!prevDepsList && !currentDepsList) return true;

  return prevDepsList.length === currentDepsList.length;
}
