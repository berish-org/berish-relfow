import { RefCallback } from './RefCallback';
import { RefObject } from './RefObject';

export type Ref<T> = RefCallback<T> | RefObject<T> | null;
