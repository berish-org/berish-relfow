export interface Hook<T> {
  readonly type: string | symbol;
  readonly state: T;
}
