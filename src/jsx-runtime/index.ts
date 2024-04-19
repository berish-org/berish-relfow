import { Fragment as F } from '../Fragment';
import { createElement } from '../ReflowElement';
import { Attributes, FunctionComponent, JSXElementConstructor, Key, ReflowElement, ReflowNode } from '../types';

export namespace JSX {
  type ElementType = JSXElementConstructor<any>;
  interface Element extends ReflowElement {}
  interface ElementAttributesProperty {
    props: {};
  }
  interface ElementChildrenAttribute {
    children: {};
  }
  interface IntrinsicAttributes extends Attributes {}
  interface IntrinsicElements {}

  // export type HTMLAttributes = Record<string, ReflowNode | undefined> & JSXChildren;

  // // Allow any HTML tag
  // export type IntrinsicElements = Record<string, HTMLAttributes & { key?: Key }>;
  // export type ElementAttributesProperty = {
  //   props; // specify the property name to use
  // };

  // // Declare the shape of JSX rendering result
  // // This is required so the return types of components can be inferred
  // export type Element = any;
}

export function renderJSX(tag: FunctionComponent, props: unknown): ReflowElement {
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
