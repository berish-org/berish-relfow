import { Fragment as F } from '../Fragment';
import { createElement } from '../ReflowElement';
import { FunctionComponent, Key, ReflowElement, ReflowNode } from '../types';

export namespace JSX {
  export type HTMLAttributes = Record<string, JSXNode | undefined> & JSXChildren;

  // Allow any HTML tag
  export type IntrinsicElements = Record<string, HTMLAttributes> & { key?: Key };

  // Declare the shape of JSX rendering result
  // This is required so the return types of components can be inferred
  export type Element = any;
}

export function renderJSX(tag: FunctionComponent, props: Record<string, any>, key?: string): JSX.Element {
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
export const Fragment = F;

export interface JSXChildren {
  children?: JSXNode | JSXNode[] | undefined;
}

export type JSXNode = (() => JSXNode) | boolean | null | undefined;
