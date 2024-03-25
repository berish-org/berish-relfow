import { ReflowNode } from './ReflowNode';

export type JSXElementConstructor<Props> = (props: Props) => ReflowNode;
