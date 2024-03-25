import { DependencyList } from '../types';

/**
 * Проверяет, корректно ли отправили DependencyList
 * @param depsList
 */
export function isDependencyListDeclarationCorrect(depsList: DependencyList) {
  return !depsList || Array.isArray(depsList);
}
