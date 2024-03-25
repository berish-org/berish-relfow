import { EventEmitter2 } from 'eventemitter2';

import { ReflowOwner } from '../ReflowOwner';

export interface ReflowEmitterMap {
  mounted: void;
  unmounted: void;
  updated: void;
}

const ReflowOwnerToReflowEmitterMap = new WeakMap<ReflowOwner, ReflowEmitter>();

export class ReflowEmitter {
  static getFromContext() {
    const owner = ReflowOwner.getFromContext();
    return this.getFromOwner(owner);
  }

  static getFromOwner(owner: ReflowOwner) {
    if (!ReflowOwnerToReflowEmitterMap.has(owner)) {
      const hook = new ReflowEmitter();
      ReflowOwnerToReflowEmitterMap.set(owner, hook);
    }

    return ReflowOwnerToReflowEmitterMap.get(owner);
  }

  private emitter: EventEmitter2;

  private constructor() {
    this.emitter = new EventEmitter2();
  }

  emit<Key extends keyof ReflowEmitterMap>(key: Key, payload: ReflowEmitterMap[Key]) {
    return this.emitter.emit(key, payload);
  }

  on<Key extends keyof ReflowEmitterMap>(key: Key, listener: (value: ReflowEmitterMap[Key]) => void) {
    return this.emitter.on(key, listener);
  }

  off<Key extends keyof ReflowEmitterMap>(key: Key, listener?: (value: ReflowEmitterMap[Key]) => void) {
    if (typeof listener === 'undefined') return this.emitter.removeAllListeners(key);
    return this.emitter.off(key, listener);
  }
}
