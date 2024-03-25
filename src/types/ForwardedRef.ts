import { MutableRefObject } from './MutableRefObject';

export type ForwardedRef<T> = ((instance: T | null) => void) | MutableRefObject<T | null> | null;
