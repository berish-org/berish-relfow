import { ReflowNode } from './ReflowNode';

export type PropsWithChildren<P = unknown> = P & { children?: ReflowNode | undefined };
