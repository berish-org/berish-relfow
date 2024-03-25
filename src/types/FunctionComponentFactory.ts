import { Attributes } from './Attributes';
import { FunctionComponentElement } from './FunctionComponentElement';
import { ReflowNode } from './ReflowNode';

export type FunctionComponentFactory<P> = (props?: Attributes & P, ...children: ReflowNode[]) => FunctionComponentElement<P>;
