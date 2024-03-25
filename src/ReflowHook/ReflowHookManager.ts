import { HookWrongCall } from '../errors';
import { ReflowOwner } from '../ReflowOwner';
import { Hook } from '../types';

const ReflowOwnerToReflowHookManagerMap = new WeakMap<ReflowOwner, ReflowHookManager>();
const HookToReflowHookManagerMap = new WeakMap<Hook<any>, ReflowHookManager>();

export class ReflowHookManager {
  static getFromContext() {
    const owner = ReflowOwner.getFromContext();
    return this.getFromOwner(owner);
  }

  static getFromOwner(owner: ReflowOwner) {
    if (!ReflowOwnerToReflowHookManagerMap.has(owner)) {
      const hook = new ReflowHookManager(owner);
      ReflowOwnerToReflowHookManagerMap.set(owner, hook);
    }

    return ReflowOwnerToReflowHookManagerMap.get(owner);
  }

  static getFromHook(hook: Hook<any>) {
    return HookToReflowHookManagerMap.get(hook);
  }

  private readonly _owner: ReflowOwner;
  private readonly _hooks: Hook<any>[];

  private _hookIndex: number;

  private constructor(owner: ReflowOwner) {
    this._owner = owner;

    this._hooks = [];
    this._hookIndex = 0;
  }

  get owner() {
    return this._owner;
  }

  use<T>(type: string | symbol, factory: () => T): Hook<T> {
    if (!this._owner.isMounted) {
      const state = factory();
      const hook: Hook<T> = { type, state };

      HookToReflowHookManagerMap.set(hook, this);
      this._hooks.push(hook);
      this._hookIndex = this._hooks.length;

      return hook;
    }

    const hook = this._hooks[this._hookIndex++];
    if (!hook || hook.type !== type) throw new HookWrongCall(type);
    return hook;
  }

  resetHookIndex() {
    this._hookIndex = 0;
  }
}
