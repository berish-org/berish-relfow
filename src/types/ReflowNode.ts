import { ReflowElement } from './ReflowElement';

export type ReflowNode = ReflowElement | boolean | null | undefined | void | ReflowNode[];
