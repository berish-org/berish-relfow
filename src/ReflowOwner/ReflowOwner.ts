import { ReflowOwnerContextNotFoundError } from '../errors';
import { ReflowEmitter } from '../ReflowEmitter';
import { ReflowHookManager } from '../ReflowHook';
import { ReflowElement, RefObject } from '../types';
import { flatReflowNodeToElements, isPropsEquals } from '../utils';
import { ReflowOwnerContext } from './AsyncContexts';
import { reconciliation } from './reconcilation';

const ReflowElementToReflowOwnerMap: WeakMap<ReflowElement, ReflowOwner> = new WeakMap();
const RefObjectToReflowOwnerMap = new WeakMap<RefObject<any>, ReflowOwner>();

export class ReflowOwner {
  static createOwnerFromElement(element: ReflowElement, parent?: ReflowOwner): ReflowOwner {
    const owner = new ReflowOwner(element, parent);
    ReflowElementToReflowOwnerMap.set(element, owner);

    return this.getFromElement(element);
  }

  static getFromElement(element: ReflowElement): ReflowOwner {
    return ReflowElementToReflowOwnerMap.get(element);
  }

  static linkRefWithOwner<T>(ref: RefObject<T>, owner: ReflowOwner) {
    RefObjectToReflowOwnerMap.set(ref, owner);
  }

  static getFromRef<T>(ref: RefObject<T>): ReflowOwner {
    return RefObjectToReflowOwnerMap.get(ref);
  }

  static getFromContext() {
    const value = ReflowOwnerContext.getValue();
    if (!value) throw new ReflowOwnerContextNotFoundError();

    return value;
  }

  private _element: ReflowElement;
  private _parent: ReflowOwner;

  private _emitter: ReflowEmitter;
  private _isMounted: boolean;
  private _prevProps: Record<string, any> = {};
  private _childElements: ReflowElement[];

  private _reflowProcessing = false;

  private constructor(element: ReflowElement, parent: ReflowOwner) {
    this._element = element;
    this._parent = parent;

    this._emitter = ReflowEmitter.getFromOwner(this);
    this._isMounted = false;
    this._prevProps = this._element.props;
    this._childElements = [];
  }

  get emitter() {
    return this._emitter;
  }

  get previousProps() {
    return this._prevProps;
  }

  get currentProps() {
    return this._element.props;
  }

  get reflowProcessing() {
    return this._reflowProcessing;
  }

  get displayName() {
    if ('displayName' in this._element.type) return this._element.type.displayName;
    return this._element.type.name;
  }

  get childElements() {
    return this._childElements;
  }

  get isMounted() {
    return this._isMounted;
  }

  get parent() {
    return this._parent;
  }

  relink(element: ReflowElement) {
    const prevElement = this._element;
    this._element = element;

    ReflowElementToReflowOwnerMap.set(element, this);
    ReflowElementToReflowOwnerMap.delete(prevElement);

    this.render();
  }

  mount() {
    try {
      if (!this._isMounted) {
        this.render(true);
        this._isMounted = true;

        this._emitter.emit('mounted', void 0);
      }
    } catch (err) {
      this.throwError(err);
    }
  }

  render(force?: boolean) {
    process.nextTick(() => {
      try {
        if (force || !isPropsEquals(this.previousProps, this.currentProps)) {
          this.reflow();

          this._emitter.emit('updated', void 0);
        }
      } catch (err) {
        this.throwError(err);
      }
    });
  }

  unmount() {
    try {
      const childOwners = this._childElements.map(element => ReflowOwner.getFromElement(element));

      for (const owner of childOwners) {
        owner.unmount();
      }

      this._isMounted = false;
      this._emitter.emit('unmounted', void 0);
    } catch (err) {
      this.throwError(err);
    }
  }

  throwError(err: any) {
    try {
      this._emitter.emit('error', err);
    } catch (err) {
      if (this.parent) this.parent.throwError(err);
      throw err;
    }
  }

  protected reflow() {
    this._reflowProcessing = true;

    const hookManager = ReflowHookManager.getFromOwner(this);
    const childNode = this.wrapOwnerContext(() => this._element.type(this.currentProps));
    const newChildElements = flatReflowNodeToElements(childNode);
    const mutations = reconciliation(this._childElements, newChildElements);

    for (const mutation of mutations) {
      if (mutation.type === 'mount') {
        const owner = ReflowOwner.createOwnerFromElement(mutation.element, this);
        if (owner) owner.mount();
      } else if (mutation.type === 'unmount') {
        const owner = ReflowOwner.getFromElement(mutation.element);
        if (owner) owner.unmount();
      } else if (mutation.type === 'update') {
        const owner = ReflowOwner.getFromElement(mutation.prevElement);
        if (owner) owner.relink(mutation.newElement);
      }
    }

    hookManager.resetHookIndex();

    this._childElements = newChildElements;
    this._prevProps = this.currentProps;
    this._reflowProcessing = false;
  }

  protected wrapOwnerContext<T>(callback: () => T) {
    return ReflowOwnerContext.run(this, callback);
  }
}
