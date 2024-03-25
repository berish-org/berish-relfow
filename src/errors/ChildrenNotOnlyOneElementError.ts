export class ChildrenNotOnlyOneElementError extends Error {
  constructor() {
    super();

    this.message = `Children has not only one element.`;
  }
}
