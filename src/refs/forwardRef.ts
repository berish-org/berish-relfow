import { ForwardRefExoticComponent, ForwardRefRenderFunction, PropsWithoutRef, RefAttributes } from '../types';

const FORWARD_REF_EXOTIC_COMPONENT = Symbol('FORWARD_REF_EXOTIC_COMPONENT');

export function forwardRef<T, P = {}>(render: ForwardRefRenderFunction<T, P>): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> {
  const func = (props: PropsWithoutRef<P> & RefAttributes<T>) => render(props as P, props.ref);

  Object.defineProperty(func, '$$typeof', { value: FORWARD_REF_EXOTIC_COMPONENT });
  func.displayName = `ForwardRef(${render.displayName || render.name})`;

  return func as ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>;
}
