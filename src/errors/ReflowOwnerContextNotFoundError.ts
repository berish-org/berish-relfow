export class ReflowOwnerContextNotFoundError extends Error {
  constructor() {
    super();

    this.message = 'BickerOwner not found in sync context';
  }
}
