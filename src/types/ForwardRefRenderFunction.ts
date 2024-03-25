import { ForwardedRef } from './ForwardedRef';
import { ReflowNode } from './ReflowNode';

export interface ForwardRefRenderFunction<T, P = {}> {
  (props: P, ref: ForwardedRef<T>): ReflowNode;
  displayName?: string | undefined;
  defaultProps?: never | undefined;
}
