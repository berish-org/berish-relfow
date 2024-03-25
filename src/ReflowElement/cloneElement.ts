import { Attributes, FunctionComponentElement, ReflowNode } from '../types';

export function cloneElement<P>(element: FunctionComponentElement<P>, props?: Partial<P> & Attributes, ...children: ReflowNode[]): FunctionComponentElement<P> {
  return {
    key: element.key ?? props.key?.toString(),
    type: element.type,
    props: Object.assign({}, element.props, props, { children }),
  };
}
