import { FunctionComponent } from './FunctionComponent';
import { ReflowElement } from './ReflowElement';

export interface FunctionComponentElement<P> extends ReflowElement<P, FunctionComponent<P>> {
  ref?: ('ref' extends keyof P ? (P extends { ref?: infer R | undefined } ? R : never) : never) | undefined;
}
