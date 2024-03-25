export class DependencyListDeclarationIsNotCorrect extends Error {
  constructor(hookName?: string | symbol) {
    super();

    this.message = ['DependencyList is not correct', hookName && ` for '${hookName.toString()}' hook`].filter(Boolean).join('');
  }
}
