import { ContextObservable } from '../types';

export function createContextObservable<T>(defaultValue: T | null): ContextObservable<T> {
  const subscribers: ((value: T) => void)[] = [];

  const emit = (value: T): void => {
    for (const subscriber of subscribers) {
      subscriber(value);
    }
  };

  const subscribe = (subscriber: (value: T) => void) => {
    if (subscribers.indexOf(subscriber) === -1) {
      subscribers.push(subscriber);
    }
  };

  const unsubscribe = (subscriber: (value: T) => void) => {
    subscribers.splice(subscribers.indexOf(subscriber), 1);
  };

  return {
    defaultValue,
    subscribers,
    emit,
    subscribe,
    unsubscribe,
  };
}
