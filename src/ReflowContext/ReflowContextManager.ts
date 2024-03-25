import { ReflowOwner } from '../ReflowOwner';
import { Context } from '../types';

const ContextToDefaultValueMap = new WeakMap<Context<any>, any>();
const ReflowOwnerToReflowContextManagerMap = new WeakMap<ReflowOwner, ReflowContextManager>();

export class ReflowContextManager {
  static getFromContext() {
    const owner = ReflowOwner.getFromContext();
    return this.getFromOwner(owner);
  }

  static getFromOwner(owner: ReflowOwner) {
    if (!ReflowOwnerToReflowContextManagerMap.has(owner)) {
      const hook = new ReflowContextManager(owner);
      ReflowOwnerToReflowContextManagerMap.set(owner, hook);
    }

    return ReflowOwnerToReflowContextManagerMap.get(owner);
  }

  static registerContextDefaultValue<T>(context: Context<T>, value: T) {
    ContextToDefaultValueMap.set(context, value);
  }

  private _owner: ReflowOwner;
  private _localContextMap: WeakMap<Context<any>, any>;
  private _localContextListeners: WeakMap<Context<any>, ((value: any) => void)[]>;

  private constructor(owner: ReflowOwner) {
    this._owner = owner;
    this._localContextMap = new Map();
    this._localContextListeners = new WeakMap();
  }

  get parent() {
    return this._owner.parent ? ReflowContextManager.getFromOwner(this._owner.parent) : null;
  }

  get currentStore() {
    return this._localContextMap;
  }

  setValue<T>(context: Context<T>, value: T) {
    this._localContextMap.set(context, value);

    const contextListeners = this.getContextListeners(context);
    for (const listener of contextListeners) {
      listener(value);
    }
  }

  getValue<T>(context: Context<T>) {
    if (this._localContextMap.has(context)) return this._localContextMap.get(context);
    if (this.parent) return this.parent.getValue(context);

    return ContextToDefaultValueMap.get(context);
  }

  listen<T>(context: Context<T>, callback: (value: T) => void) {
    let parentUnlistener: () => void;
    if (this.parent) {
      parentUnlistener = this.parent.listen(context, (value) => {
        if (!this._localContextMap.has(context)) callback(value);
      });
    }

    const localListeners = this.getContextListeners(context);
    localListeners.push(callback);

    return () => {
      if (parentUnlistener) parentUnlistener();
      localListeners.splice(localListeners.indexOf(callback), 1);
    };
  }

  getContextListeners<T>(context: Context<T>) {
    if (!this._localContextListeners.has(context)) this._localContextListeners.set(context, []);
    return this._localContextListeners.get(context);
  }

  // get<T>(observable: ContextObservable<T>): T {
  //   const key = ContextObservableToUniqueIdMap.get(observable);
  //   return this._store[key];
  // }

  // set<T>(observable: ContextObservable<T>, value: T) {
  //   const key = ContextObservableToUniqueIdMap.get(observable);

  //   this._store[key] = value;
  // }

  // remove<T>(observable: ContextObservable<T>) {
  //   const key = ContextObservableToUniqueIdMap.get(observable);
  //   delete this._store[key];
  // }

  // aggregateStore(): Record<symbol, any> {
  //   let currentStore = this._store;

  //   let parentOwner: ReflowOwner;
  //   let parentContextManager: ReflowContextManager;

  //   do {
  //     parentOwner = this._owner.parent;
  //     parentContextManager = parentOwner && ReflowContextManager.getFromOwner(parentOwner);

  //     if (parentContextManager) {
  //       currentStore = Object.assign({}, parentContextManager._store, currentStore);
  //     }
  //   } while (parentOwner && parentContextManager);

  //   return currentStore;
  // }
}
