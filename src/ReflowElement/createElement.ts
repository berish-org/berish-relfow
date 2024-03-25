import { Attributes, FunctionComponent, FunctionComponentElement, ReflowNode } from '../types';

export function createElement<P extends {}>(type: FunctionComponent<P>, props?: (Attributes & P) | null, ...children: ReflowNode[]): FunctionComponentElement<P> {
  const { key, ...elementProps } = Object.assign({ children }, props);

  const element: FunctionComponentElement<P> = {
    key: key?.toString(),
    type,
    props: <P>elementProps,
  };

  return element;
}
