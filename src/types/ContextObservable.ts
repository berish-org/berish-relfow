export interface ContextObservable<T> {
  defaultValue: T | null;
  subscribers: ((value: T) => void)[];
  emit: (value: T) => void;
  subscribe: (subscriber: (value: T) => void) => void;
  unsubscribe: (subscriber: (value: T) => void) => void;
}
