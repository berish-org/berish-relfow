import { Attributes } from './Attributes';
import { ReflowNode } from './ReflowNode';

export interface FunctionComponent<Props = {}> {
  (props: Props & Attributes, context?: any): ReflowNode;
  defaultProps?: Partial<Props> | undefined;
  displayName?: string | undefined;
}

export type FC<P = {}> = FunctionComponent<P>;
