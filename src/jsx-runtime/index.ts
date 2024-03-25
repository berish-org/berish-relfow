import { createElement } from '../ReflowElement';
import { FunctionComponent, ReflowElement, ReflowNode } from '../types';

namespace JSX {
  export type HTMLAttributes = Record<string, JSXNode | undefined> & JSXChildren;

  // Allow any HTML tag
  export type IntrinsicElements = Record<string, HTMLAttributes>;

  // Declare the shape of JSX rendering result
  // This is required so the return types of components can be inferred
  export type Element = any;
}

// Export the main namespace
export { JSX };

export function renderJSX(tag: FunctionComponent, props: Record<string, any>, _key?: string): JSX.Element {
  if (typeof tag === 'function') {
    // handling Function Components
    return createElement(tag, props);
  }

  throw new TypeError('Custom tags not supported.');
}

// Export factories
export const jsx = renderJSX;
export const jsxs = renderJSX;
export const jsxDEV = renderJSX;

export class RenderedNode {
  public constructor(public readonly string: string) {}
}

export interface JSXChildren {
  children?: JSXNode | JSXNode[] | undefined;
}

export type JSXNode = RenderedNode | (() => JSXNode) | boolean | null | undefined;
