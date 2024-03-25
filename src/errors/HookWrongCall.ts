export class HookWrongCall extends Error {
  constructor(hookName?: string | symbol) {
    super();

    this.message = ['Wrong call hook', hookName && ` with '${hookName.toString()}' hookName`].filter(Boolean).join('');
  }
}
