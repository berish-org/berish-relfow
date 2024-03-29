import { useReflowHook } from '../ReflowHook';
import { ReflowOwner, useReflowOwner } from '../ReflowOwner';
import { createRef } from '../refs';
import { MutableRefObject, RefObject } from '../types';

const USE_REF_HOOK = Symbol('USE_REF_HOOK');

interface UseRefState<T> {
  ref: MutableRefObject<T>;
}

export function useRef<T>(initialValue: T): MutableRefObject<T>;
export function useRef<T>(initialValue: T | null): RefObject<T>;
export function useRef<T = undefined>(): MutableRefObject<T | undefined>;
export function useRef<T>(initial?: T): MutableRefObject<T> {
  const owner = useReflowOwner();

  const hook = useReflowHook<UseRefState<T>>(USE_REF_HOOK, () => {
    const ref: MutableRefObject<T> = createRef();
    ref.current = initial;

    ReflowOwner.linkRefWithOwner(ref, owner);

    return { ref };
  });

  return hook.state.ref;
}
