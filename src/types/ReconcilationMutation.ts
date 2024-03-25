import { ReflowElement } from './ReflowElement';

export type ReconcilationMutationMount = {
  type: 'mount';

  element: ReflowElement;
};

export type ReconcilationMutationUnmount = {
  type: 'unmount';

  element: ReflowElement;
};

export type ReconcilationMutationUpdate = {
  type: 'update';

  prevElement: ReflowElement;
  newElement: ReflowElement;
};

export type ReconcilationMutation = ReconcilationMutationMount | ReconcilationMutationUnmount | ReconcilationMutationUpdate;
