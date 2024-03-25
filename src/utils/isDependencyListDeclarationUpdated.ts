import { DependencyListDeclarationIsNotCorrect } from '../errors';
import { DependencyList } from '../types';
import { isDependencyListDeclarationEqualsCorrect } from './isDependencyListDeclarationEqualsCorrect';

export function isDependencyListDeclarationUpdated(prevDepsList: DependencyList, currentDepsList: DependencyList, hookName?: string | symbol): boolean {
  if (!isDependencyListDeclarationEqualsCorrect(prevDepsList, currentDepsList)) throw new DependencyListDeclarationIsNotCorrect(hookName);

  if (!prevDepsList) return true;
  return (prevDepsList || []).some((item, index) => !Object.is(item, currentDepsList[index]));
}
