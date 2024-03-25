import { Attributes } from './Attributes';
import { Ref } from './Ref';

export interface RefAttributes<T> extends Attributes {
  ref?: Ref<T> | undefined;
}
