import { PropsWithoutRef } from './PropsWithoutRef';

export type PropsWithRef<P> = 'ref' extends keyof P ? (P extends { ref?: infer R | undefined } ? (string extends R ? PropsWithoutRef<P> & { ref?: Exclude<R, string> | undefined } : P) : P) : P;
