export class ReflowElementIsNotValidError extends Error {
  constructor() {
    super();

    this.message = 'ReflowElement is not valid.';
  }
}
