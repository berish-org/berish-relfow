export class DependencyListDeclarationIsNotEqualsCorrect extends Error {
  constructor(hookName?: string | symbol) {
    super();

    this.message = ['DependencyList is not equals by prev depsList', hookName && ` for '${hookName?.toString()}' hook`].filter(Boolean).join('');
  }
}
