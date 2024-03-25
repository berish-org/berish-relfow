export interface RefObject<T> {
  /**
   * The current value of the ref.
   */
  readonly current: T | null;
}
