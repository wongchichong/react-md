var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const SYMBOL_OBSERVABLE = Symbol("Observable");
const SYMBOL_OBSERVABLE_FROZEN = Symbol("Frozen");
const SYMBOL_OBSERVABLE_READABLE = Symbol("Readable");
const SYMBOL_OBSERVABLE_WRITABLE = Symbol("Writable");
const SYMBOL_STORE = Symbol("Store");
const SYMBOL_STORE_KEYS = Symbol("Keys");
const SYMBOL_STORE_OBSERVABLE = Symbol("Observable");
const SYMBOL_STORE_TARGET = Symbol("Target");
const SYMBOL_STORE_VALUES = Symbol("Values");
const SYMBOL_STORE_UNTRACKED = Symbol("Untracked");
const SYMBOL_UNCACHED = Symbol("Uncached");
const SYMBOL_UNTRACKED = Symbol("Untracked");
const SYMBOL_UNTRACKED_UNWRAPPED = Symbol("Unwrapped");
const suspended = () => {
  return void 0;
};
const lazyArrayEach = (arr, fn) => {
  if (arr instanceof Array) {
    arr.forEach(fn);
  } else if (arr) {
    fn(arr);
  }
};
const lazyArrayEachRight = (arr, fn) => {
  if (arr instanceof Array) {
    for (let i = arr.length - 1; i >= 0; i--) {
      fn(arr[i]);
    }
  } else if (arr) {
    fn(arr);
  }
};
const lazyArrayPush = (obj, key, value) => {
  const arr = obj[key];
  if (arr instanceof Array) {
    arr.push(value);
  } else if (arr) {
    obj[key] = [arr, value];
  } else {
    obj[key] = value;
  }
};
const lazySetAdd = (obj, key, value) => {
  const set = obj[key];
  if (set instanceof Set) {
    set.add(value);
  } else if (set) {
    if (value !== set) {
      const s = /* @__PURE__ */ new Set();
      s.add(set);
      s.add(value);
      obj[key] = s;
    }
  } else {
    obj[key] = value;
  }
};
const lazySetDelete = (obj, key, value) => {
  const set = obj[key];
  if (set instanceof Set) {
    set.delete(value);
  } else if (set === value) {
    obj[key] = void 0;
  }
};
const lazySetEach = (set, fn) => {
  if (set instanceof Set) {
    for (const value of set) {
      fn(value);
    }
  } else if (set) {
    fn(set);
  }
};
const lazySetHas = (set, value) => {
  if (set instanceof Set) {
    return set.has(value);
  } else {
    return set === value;
  }
};
const castArray$1 = (value) => {
  return isArray$1(value) ? value : [value];
};
const castError$1 = (error2) => {
  if (error2 instanceof Error)
    return error2;
  if (typeof error2 === "string")
    return new Error(error2);
  return new Error("Unknown error");
};
const { is } = Object;
const { isArray: isArray$1 } = Array;
const isFunction$1 = (value) => {
  return typeof value === "function";
};
const isNumber = (value) => {
  return typeof value === "number";
};
const isObject$1 = (value) => {
  return value !== null && typeof value === "object";
};
const max = (a, b) => {
  return a > b ? a : b;
};
const noop = () => {
  return;
};
const nope = () => {
  return false;
};
class Observer {
  constructor() {
    __publicField(this, "parent");
    __publicField(this, "signal");
    __publicField(this, "cleanups");
    __publicField(this, "contexts");
    __publicField(this, "errors");
    __publicField(this, "observables");
    __publicField(this, "observablesLeftover");
    __publicField(this, "observers");
    __publicField(this, "roots");
    __publicField(this, "inactive");
  }
  // Inactive observers should not be re-executed, if they can be
  /* REGISTRATION API */
  registerCleanup(cleanup2) {
    lazyArrayPush(this, "cleanups", cleanup2);
  }
  registerError(error2) {
    lazyArrayPush(this, "errors", error2);
  }
  registerObservable(observable2) {
    lazyArrayPush(this, "observables", observable2);
  }
  registerObserver(observer) {
    lazyArrayPush(this, "observers", observer);
  }
  registerRoot(root2) {
    lazySetAdd(this, "roots", root2);
  }
  unregisterRoot(root2) {
    lazySetDelete(this, "roots", root2);
  }
  /* API */
  catch(error2, silent) {
    const { errors, parent } = this;
    if (errors) {
      try {
        lazyArrayEach(errors, (fn) => fn.call(fn, error2));
      } catch (error22) {
        if (parent) {
          parent.catch(castError$1(error22), false);
        } else {
          throw error22;
        }
      }
      return true;
    } else {
      if (parent == null ? void 0 : parent.catch(error2, true))
        return true;
      if (silent) {
        return false;
      } else {
        throw error2;
      }
    }
  }
  dispose(deep, immediate) {
    const { observers, observables, cleanups, errors, contexts } = this;
    if (observers) {
      this.observers = void 0;
      lazyArrayEachRight(observers, (observer) => {
        observer.dispose(true, true);
      });
    }
    if (observables) {
      this.observables = void 0;
      if (immediate) {
        lazyArrayEach(observables, (observable2) => {
          if (!observable2.signal.disposed) {
            observable2.unregisterObserver(this);
          }
        });
      } else {
        this.observablesLeftover = observables;
      }
    }
    if (cleanups) {
      this.cleanups = void 0;
      this.inactive = true;
      lazyArrayEachRight(cleanups, (cleanup2) => cleanup2.call(cleanup2));
      this.inactive = false;
    }
    if (errors) {
      this.errors = void 0;
    }
    if (contexts) {
      this.contexts = void 0;
    }
  }
  postdispose() {
    const prev = this.observablesLeftover;
    if (!prev)
      return;
    this.observablesLeftover = void 0;
    const next = this.observables;
    if (prev === next)
      return;
    const a = prev instanceof Array ? prev : [prev];
    const b = next instanceof Array ? next : next ? [next] : [];
    let bSet;
    for (let ai = 0, al = a.length; ai < al; ai++) {
      const av = a[ai];
      if (av.signal.disposed)
        continue;
      if (av === b[ai])
        continue;
      bSet || (bSet = new Set(b));
      if (bSet.has(av))
        continue;
      av.unregisterObserver(this);
    }
  }
  read(symbol) {
    const { contexts, parent } = this;
    if (contexts && symbol in contexts)
      return contexts[symbol];
    return parent == null ? void 0 : parent.read(symbol);
  }
  write(symbol, value) {
    this.contexts || (this.contexts = {});
    this.contexts[symbol] = value;
  }
  wrap(fn, tracking = false) {
    const ownerPrev = OWNER;
    const trackingPrev = TRACKING;
    setOwner(this);
    setTracking(tracking);
    let result;
    try {
      result = fn();
    } catch (error2) {
      this.catch(castError$1(error2), false);
    } finally {
      setOwner(ownerPrev);
      setTracking(trackingPrev);
    }
    return result;
  }
}
class Root extends Observer {
  /* CONSTRUCTOR */
  constructor(pausable) {
    super();
    __publicField(this, "parent", OWNER);
    __publicField(this, "disposed");
    __publicField(this, "pausable");
    if (pausable && isNumber(suspended())) {
      this.pausable = true;
      this.parent.registerRoot(this);
    }
  }
  /* API */
  dispose(deep, immediate) {
    this.disposed = true;
    if (this.pausable) {
      this.parent.unregisterRoot(this);
    }
    super.dispose(deep, immediate);
  }
  wrap(fn) {
    const dispose = this.dispose.bind(this, true, true);
    const fnWithDispose = fn.bind(void 0, dispose);
    const rootPrev = ROOT;
    setRoot(this);
    try {
      return super.wrap(fnWithDispose);
    } finally {
      setRoot(rootPrev);
    }
  }
}
class SuperRoot extends Observer {
  constructor() {
    super(...arguments);
    __publicField(this, "disposed", false);
  }
}
let SUPER_OWNER = new SuperRoot();
let BATCH;
let OWNER = SUPER_OWNER;
let ROOT = SUPER_OWNER;
let ROOT_DISPOSED = Object.assign(new Root(), { disposed: true });
let TRACKING = false;
const setBatch = (value) => BATCH = value;
const setOwner = (value) => OWNER = value;
const setRoot = (value) => ROOT = value;
const setTracking = (value) => TRACKING = value;
const start = () => {
  setBatch(/* @__PURE__ */ new Map());
};
const stop = () => {
  const batch2 = BATCH;
  if (!batch2)
    return;
  setBatch();
  if (batch2.size > 1) {
    batch2.forEach(stale);
    batch2.forEach(write);
    batch2.forEach(unstale);
  } else {
    batch2.forEach(write);
  }
};
const wrap = (fn, onBefore, onAfter) => {
  onBefore();
  try {
    const result = fn();
    if (result instanceof Promise) {
      result.finally(onAfter);
    } else {
      onAfter();
    }
    return result;
  } catch (error2) {
    onAfter();
    throw error2;
  }
};
const stale = (value, observable2) => {
  observable2.emit(1, false);
};
const unstale = (value, observable2) => {
  observable2.emit(-1, false);
};
const write = (value, observable2) => {
  observable2.write(value);
};
const batch = (fn) => {
  if (BATCH) {
    return fn();
  } else {
    return wrap(fn, start, stop);
  }
};
function frozenFunction() {
  if (arguments.length)
    throw new Error("A readonly Observable can not be updated");
  return this;
}
function readableFunction(symbol) {
  if (arguments.length) {
    if (symbol === SYMBOL_OBSERVABLE)
      return this;
    throw new Error("A readonly Observable can not be updated");
  }
  return this.read();
}
function writableFunction(fn) {
  if (arguments.length) {
    if (fn === SYMBOL_OBSERVABLE)
      return this;
    if (isFunction$1(fn))
      return this.update(fn);
    return this.write(fn);
  }
  return this.read();
}
const frozen = (value) => {
  const fn = frozenFunction.bind(value);
  fn[SYMBOL_OBSERVABLE] = true;
  fn[SYMBOL_OBSERVABLE_FROZEN] = true;
  return fn;
};
const readable = (value) => {
  if (value.signal === ROOT_DISPOSED)
    return frozen(value.value);
  const fn = readableFunction.bind(value);
  fn[SYMBOL_OBSERVABLE] = true;
  fn[SYMBOL_OBSERVABLE_READABLE] = true;
  return fn;
};
const writable = (value) => {
  const fn = writableFunction.bind(value);
  fn[SYMBOL_OBSERVABLE] = true;
  fn[SYMBOL_OBSERVABLE_WRITABLE] = true;
  return fn;
};
const getExecution = (status) => {
  return status & 3;
};
const setExecution = (status, execution) => {
  return status >>> 2 << 2 | execution;
};
const getFresh = (status) => {
  return !!(status & 4);
};
const setFresh = (status, fresh) => {
  return fresh ? status | 4 : status;
};
const getCount = (status) => {
  return status >>> 3;
};
const changeCount = (status, change) => {
  return status + (change << 3);
};
class Computation extends Observer {
  constructor() {
    super(...arguments);
    __publicField(this, "parent", OWNER);
    __publicField(this, "signal", ROOT);
    __publicField(this, "status", 0);
  }
  /* API */
  emit(change, fresh) {
    if (change < 0 && !getCount(this.status))
      return;
    this.status = changeCount(this.status, change);
    this.status = setFresh(this.status, fresh);
    if (getCount(this.status))
      return;
    fresh = getFresh(this.status);
    this.status = getExecution(this.status);
    if (this.inactive)
      return;
    this.update(fresh);
  }
  update(fresh) {
  }
  wrap(fn, tracking = true) {
    return super.wrap(fn, tracking);
  }
}
class Observable {
  /* CONSTRUCTOR */
  constructor(value, options, parent) {
    __publicField(this, "parent");
    __publicField(this, "signal", ROOT);
    __publicField(this, "value");
    __publicField(this, "equals");
    __publicField(this, "listeners");
    __publicField(this, "observers");
    this.value = value;
    if (parent) {
      this.parent = parent;
    }
    if ((options == null ? void 0 : options.equals) !== void 0) {
      this.equals = options.equals || nope;
    }
  }
  /* REGISTRATION API */
  registerListener(listener) {
    if (lazySetHas(this.listeners, listener))
      return;
    lazySetAdd(this, "listeners", listener);
  }
  registerObserver(observer) {
    lazySetAdd(this, "observers", observer);
  }
  registerSelf() {
    if (this.signal.disposed)
      return;
    if (TRACKING) {
      const owner2 = OWNER;
      if (owner2.observables !== this) {
        this.registerObserver(owner2);
        owner2.registerObservable(this);
      }
    }
    if (this.parent && getCount(this.parent.status)) {
      this.parent.status = getExecution(this.parent.status);
      this.parent.update(true);
    }
  }
  unregisterListener(listener) {
    lazySetDelete(this, "listeners", listener);
  }
  unregisterObserver(observer) {
    lazySetDelete(this, "observers", observer);
  }
  /* API */
  read() {
    this.registerSelf();
    return this.value;
  }
  write(value) {
    if (this.signal === ROOT_DISPOSED)
      throw new Error("A disposed Observable can not be updated");
    if (BATCH) {
      BATCH.set(this, value);
      return value;
    } else {
      const equals = this.equals || is;
      const fresh = !equals(value, this.value);
      if (!this.parent) {
        if (!fresh)
          return value;
        if (!this.signal.disposed) {
          this.emit(1, fresh);
        }
      }
      if (fresh) {
        const valuePrev = this.value;
        this.value = value;
        this.listened(valuePrev);
      }
      if (!this.signal.disposed) {
        this.emit(-1, fresh);
      }
      return value;
    }
  }
  update(fn) {
    const valueNext = fn(this.value);
    return this.write(valueNext);
  }
  emit(change, fresh) {
    if (this.signal.disposed)
      return;
    const computations = this.observers;
    if (computations) {
      if (computations instanceof Set) {
        for (const computation of computations) {
          computation.emit(change, fresh);
        }
      } else {
        computations.emit(change, fresh);
      }
    }
  }
  listened(valuePrev) {
    if (this.signal.disposed)
      return;
    const { listeners } = this;
    if (listeners) {
      if (listeners instanceof Set) {
        for (const listener of listeners) {
          listener.call(listener, this.value, valuePrev);
        }
      } else {
        listeners.call(listeners, this.value, valuePrev);
      }
    }
  }
  dispose() {
    this.signal = ROOT_DISPOSED;
  }
}
class Memo extends Computation {
  /* CONSTRUCTOR */
  constructor(fn, options) {
    super();
    __publicField(this, "fn");
    __publicField(this, "observable");
    this.fn = fn;
    this.observable = new Observable(void 0, options, this);
    this.parent.registerObserver(this);
    this.update(true, true);
  }
  /* API */
  dispose(deep, immediate) {
    if (deep && !this.signal.disposed) {
      this.observable.dispose();
    }
    super.dispose(deep, immediate);
  }
  emit(change, fresh) {
    if (change > 0 && !getCount(this.status)) {
      this.observable.emit(change, false);
    }
    super.emit(change, fresh);
  }
  update(fresh, first) {
    if (fresh && !this.observable.signal.disposed) {
      const status = getExecution(this.status);
      if (status) {
        this.status = setExecution(this.status, fresh ? 3 : max(status, 2));
        if (status > 1) {
          this.observable.emit(-1, false);
        }
      } else {
        this.status = setExecution(this.status, 1);
        this.dispose();
        try {
          const value = this.wrap(this.fn);
          this.postdispose();
          if (this.observable.signal.disposed) {
            this.observable.emit(-1, false);
          } else if (first) {
            this.observable.value = value;
          } else {
            this.observable.write(value);
          }
          if (!this.observers && !this.observables && !this.cleanups) {
            this.dispose(true, true);
          }
        } catch (error2) {
          this.postdispose();
          this.catch(castError$1(error2), false);
          this.observable.emit(-1, false);
        } finally {
          const status2 = getExecution(this.status);
          this.status = setExecution(status2, 0);
          if (status2 > 1) {
            this.update(status2 === 3);
          } else if (!this.observables) {
            this.fn = noop;
            this.observable.dispose();
          }
        }
      }
    } else {
      this.observable.emit(-1, false);
    }
  }
}
const memo = (fn, options) => {
  const memo2 = new Memo(fn, options);
  const observable2 = readable(memo2.observable);
  return observable2;
};
const isObservableFrozen = (value) => {
  return isFunction$1(value) && SYMBOL_OBSERVABLE_FROZEN in value;
};
const cleanup = (fn) => {
  OWNER.registerCleanup(fn);
};
function context(symbol, value) {
  if (arguments.length < 2) {
    return OWNER.read(symbol);
  } else {
    return OWNER.write(symbol, value);
  }
}
const disposed = () => {
  const observable2 = new Observable(false);
  cleanup(() => {
    observable2.write(true);
  });
  return readable(observable2);
};
class Reaction extends Computation {
  /* CONSTRUCTOR */
  constructor(fn, pausable) {
    super();
    __publicField(this, "fn");
    this.fn = fn;
    this.parent.registerObserver(this);
    if (pausable && suspended()) {
      this.emit(1, true);
    } else {
      this.update(true);
    }
  }
  /* API */
  update(fresh) {
    if (fresh && !this.signal.disposed) {
      const status = getExecution(this.status);
      if (status) {
        this.status = setExecution(this.status, fresh ? 3 : max(status, 2));
      } else {
        this.status = setExecution(this.status, 1);
        this.dispose();
        try {
          const cleanup2 = this.wrap(this.fn);
          this.postdispose();
          if (isFunction$1(cleanup2)) {
            this.registerCleanup(cleanup2);
          } else {
            if (!this.observers && !this.observables && !this.cleanups) {
              this.dispose(true, true);
            }
          }
        } catch (error2) {
          this.postdispose();
          this.catch(castError$1(error2), false);
        } finally {
          const status2 = getExecution(this.status);
          this.status = setExecution(this.status, 0);
          if (status2 > 1) {
            this.update(status2 === 3);
          } else if (!this.observables) {
            this.fn = noop;
          }
        }
      }
    }
  }
}
class Effect extends Reaction {
  /* CONSTRUCTOR */
  constructor(fn) {
    super(fn, true);
  }
}
const effect = (fn) => {
  const effect2 = new Effect(fn);
  const dispose = effect2.dispose.bind(effect2, true, true);
  return dispose;
};
const isObservable = (value) => {
  return isFunction$1(value) && (SYMBOL_OBSERVABLE_FROZEN in value || SYMBOL_OBSERVABLE_READABLE in value || SYMBOL_OBSERVABLE_WRITABLE in value);
};
function get(value, getFunction = true) {
  const is2 = getFunction ? isFunction$1 : isObservable;
  if (is2(value)) {
    return value();
  } else {
    return value;
  }
}
const isStore = (value) => {
  return isObject$1(value) && SYMBOL_STORE in value;
};
const resolve = (value) => {
  if (isFunction$1(value)) {
    if (SYMBOL_UNTRACKED_UNWRAPPED in value) {
      return resolve(value());
    } else if (SYMBOL_UNTRACKED in value) {
      return frozen(resolve(value()));
    } else if (SYMBOL_OBSERVABLE in value) {
      return value;
    } else {
      return memo(() => resolve(value()));
    }
  }
  if (value instanceof Array) {
    const resolved = new Array(value.length);
    for (let i = 0, l = resolved.length; i < l; i++) {
      resolved[i] = resolve(value[i]);
    }
    return resolved;
  } else {
    return value;
  }
};
function untrack(fn) {
  if (isFunction$1(fn)) {
    const trackingPrev = TRACKING;
    try {
      setTracking(false);
      return fn();
    } finally {
      setTracking(trackingPrev);
    }
  } else {
    return fn;
  }
}
frozen(-1);
frozen(-1);
const isBatching = () => {
  return !!BATCH;
};
const target = (observable2) => {
  if (isFunction$1(observable2)) {
    return observable2(SYMBOL_OBSERVABLE);
  } else {
    return observable2;
  }
};
const off = (observable2, listener) => {
  if (!isObservableFrozen(observable2)) {
    target(observable2).unregisterListener(listener);
  }
};
const on = (observable2, listener) => {
  if (!isObservableFrozen(observable2)) {
    target(observable2).registerListener(listener);
  }
  return () => {
    off(observable2, listener);
  };
};
const reaction = (fn) => {
  const reaction2 = new Reaction(fn);
  const dispose = reaction2.dispose.bind(reaction2, true, true);
  return dispose;
};
const root = (fn) => {
  return new Root(true).wrap(fn);
};
frozen(false);
frozen(true);
class StoreMap extends Map {
  insert(key, value) {
    super.set(key, value);
    return value;
  }
}
class StoreCleanable {
  constructor() {
    __publicField(this, "count", 0);
  }
  listen() {
    this.count += 1;
    cleanup(this);
  }
  call() {
    this.count -= 1;
    if (this.count)
      return;
    this.dispose();
  }
  dispose() {
  }
}
class StoreKeys extends StoreCleanable {
  constructor(parent, observable2) {
    super();
    this.parent = parent;
    this.observable = observable2;
  }
  dispose() {
    this.parent.keys = void 0;
  }
}
class StoreValues extends StoreCleanable {
  constructor(parent, observable2) {
    super();
    this.parent = parent;
    this.observable = observable2;
  }
  dispose() {
    this.parent.values = void 0;
  }
}
class StoreHas extends StoreCleanable {
  constructor(parent, key, observable2) {
    super();
    this.parent = parent;
    this.key = key;
    this.observable = observable2;
  }
  dispose() {
    var _a;
    (_a = this.parent.has) == null ? void 0 : _a.delete(this.key);
  }
}
class StoreProperty extends StoreCleanable {
  constructor(parent, key, observable2, node) {
    super();
    this.parent = parent;
    this.key = key;
    this.observable = observable2;
    this.node = node;
  }
  dispose() {
    var _a;
    (_a = this.parent.properties) == null ? void 0 : _a.delete(this.key);
  }
}
const StoreListenersRegular = {
  /* VARIABLES */
  active: 0,
  listeners: /* @__PURE__ */ new Set(),
  nodes: /* @__PURE__ */ new Set(),
  /* API */
  prepare: () => {
    const { listeners, nodes } = StoreListenersRegular;
    const traversed = /* @__PURE__ */ new Set();
    const traverse = (node) => {
      if (traversed.has(node))
        return;
      traversed.add(node);
      lazySetEach(node.parents, traverse);
      lazySetEach(node.listenersRegular, (listener) => {
        listeners.add(listener);
      });
    };
    nodes.forEach(traverse);
    return () => {
      listeners.forEach((listener) => {
        listener();
      });
    };
  },
  register: (node) => {
    StoreListenersRegular.nodes.add(node);
    StoreScheduler.schedule();
  },
  reset: () => {
    StoreListenersRegular.listeners = /* @__PURE__ */ new Set();
    StoreListenersRegular.nodes = /* @__PURE__ */ new Set();
  }
};
const StoreListenersRoots = {
  /* VARIABLES */
  active: 0,
  nodes: /* @__PURE__ */ new Map(),
  /* API */
  prepare: () => {
    const { nodes } = StoreListenersRoots;
    return () => {
      nodes.forEach((rootsSet, store2) => {
        const roots = Array.from(rootsSet);
        lazySetEach(store2.listenersRoots, (listener) => {
          listener(roots);
        });
      });
    };
  },
  register: (store2, root2) => {
    const roots = StoreListenersRoots.nodes.get(store2) || /* @__PURE__ */ new Set();
    roots.add(root2);
    StoreListenersRoots.nodes.set(store2, roots);
    StoreScheduler.schedule();
  },
  registerWith: (current, parent, key) => {
    if (!parent.parents) {
      const root2 = (current == null ? void 0 : current.store) || untrack(() => parent.store[key]);
      StoreListenersRoots.register(parent, root2);
    } else {
      const traversed = /* @__PURE__ */ new Set();
      const traverse = (node) => {
        if (traversed.has(node))
          return;
        traversed.add(node);
        lazySetEach(node.parents, (parent2) => {
          if (!parent2.parents) {
            StoreListenersRoots.register(parent2, node.store);
          }
          traverse(parent2);
        });
      };
      traverse(current || parent);
    }
  },
  reset: () => {
    StoreListenersRoots.nodes = /* @__PURE__ */ new Map();
  }
};
const StoreScheduler = {
  /* VARIABLES */
  active: false,
  /* API */
  flush: () => {
    const flushRegular = StoreListenersRegular.prepare();
    const flushRoots = StoreListenersRoots.prepare();
    StoreScheduler.reset();
    flushRegular();
    flushRoots();
  },
  flushIfNotBatching: () => {
    if (isBatching()) {
      setTimeout(StoreScheduler.flushIfNotBatching, 0);
    } else {
      StoreScheduler.flush();
    }
  },
  reset: () => {
    StoreScheduler.active = false;
    StoreListenersRegular.reset();
    StoreListenersRoots.reset();
  },
  schedule: () => {
    if (StoreScheduler.active)
      return;
    StoreScheduler.active = true;
    queueMicrotask(StoreScheduler.flushIfNotBatching);
  }
};
const NODES = /* @__PURE__ */ new WeakMap();
const SPECIAL_SYMBOLS = /* @__PURE__ */ new Set([SYMBOL_STORE, SYMBOL_STORE_KEYS, SYMBOL_STORE_OBSERVABLE, SYMBOL_STORE_TARGET, SYMBOL_STORE_VALUES]);
const UNREACTIVE_KEYS = /* @__PURE__ */ new Set(["__proto__", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__", "prototype", "constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toSource", "toString", "valueOf"]);
const STORE_TRAPS = {
  /* API */
  get: (target2, key) => {
    var _a, _b;
    if (SPECIAL_SYMBOLS.has(key)) {
      if (key === SYMBOL_STORE)
        return true;
      if (key === SYMBOL_STORE_TARGET)
        return target2;
      if (key === SYMBOL_STORE_KEYS) {
        if (isListenable()) {
          const node2 = getNodeExisting(target2);
          node2.keys || (node2.keys = getNodeKeys(node2));
          node2.keys.listen();
          node2.keys.observable.read();
        }
        return;
      }
      if (key === SYMBOL_STORE_VALUES) {
        if (isListenable()) {
          const node2 = getNodeExisting(target2);
          node2.values || (node2.values = getNodeValues(node2));
          node2.values.listen();
          node2.values.observable.read();
        }
        return;
      }
      if (key === SYMBOL_STORE_OBSERVABLE) {
        return (key2) => {
          var _a2;
          key2 = typeof key2 === "number" ? String(key2) : key2;
          const node2 = getNodeExisting(target2);
          const getter2 = (_a2 = node2.getters) == null ? void 0 : _a2.get(key2);
          if (getter2)
            return getter2.bind(node2.store);
          node2.properties || (node2.properties = new StoreMap());
          const value2 = target2[key2];
          const property2 = node2.properties.get(key2) || node2.properties.insert(key2, getNodeProperty(node2, key2, value2));
          const options = node2.equals ? { equals: node2.equals } : void 0;
          property2.observable || (property2.observable = getNodeObservable(node2, value2, options));
          const observable2 = readable(property2.observable);
          return observable2;
        };
      }
    }
    if (UNREACTIVE_KEYS.has(key))
      return target2[key];
    const node = getNodeExisting(target2);
    const getter = (_a = node.getters) == null ? void 0 : _a.get(key);
    const value = getter || target2[key];
    node.properties || (node.properties = new StoreMap());
    const listenable = isListenable();
    const proxiable = isProxiable(value);
    const property = listenable || proxiable ? node.properties.get(key) || node.properties.insert(key, getNodeProperty(node, key, value)) : void 0;
    if (property == null ? void 0 : property.node) {
      lazySetAdd(property.node, "parents", node);
    }
    if (property && listenable) {
      const options = node.equals ? { equals: node.equals } : void 0;
      property.listen();
      property.observable || (property.observable = getNodeObservable(node, value, options));
      property.observable.read();
    }
    if (getter) {
      return getter.call(node.store);
    } else {
      if (typeof value === "function" && value === Array.prototype[key]) {
        return function() {
          return batch(() => value.apply(node.store, arguments));
        };
      }
      return ((_b = property == null ? void 0 : property.node) == null ? void 0 : _b.store) || value;
    }
  },
  set: (target2, key, value) => {
    var _a;
    value = getTarget(value);
    const node = getNodeExisting(target2);
    const setter = (_a = node.setters) == null ? void 0 : _a.get(key);
    if (setter) {
      batch(() => setter.call(node.store, value));
    } else {
      const valuePrev = target2[key];
      const hadProperty = !!valuePrev || key in target2;
      const equals = node.equals || is;
      if (hadProperty && equals(value, valuePrev) && (key !== "length" || !Array.isArray(target2)))
        return true;
      target2[key] = value;
      batch(() => {
        var _a2, _b, _c, _d, _e, _f;
        (_a2 = node.values) == null ? void 0 : _a2.observable.write(0);
        if (!hadProperty) {
          (_b = node.keys) == null ? void 0 : _b.observable.write(0);
          (_d = (_c = node.has) == null ? void 0 : _c.get(key)) == null ? void 0 : _d.observable.write(true);
        }
        const property = (_e = node.properties) == null ? void 0 : _e.get(key);
        if (property == null ? void 0 : property.node) {
          lazySetDelete(property.node, "parents", node);
        }
        if (property) {
          (_f = property.observable) == null ? void 0 : _f.write(value);
          property.node = isProxiable(value) ? NODES.get(value) || getNode(value, node) : void 0;
        }
        if (property == null ? void 0 : property.node) {
          lazySetAdd(property.node, "parents", node);
        }
        if (StoreListenersRoots.active) {
          StoreListenersRoots.registerWith(property == null ? void 0 : property.node, node, key);
        }
        if (StoreListenersRegular.active) {
          StoreListenersRegular.register(node);
        }
      });
    }
    return true;
  },
  deleteProperty: (target2, key) => {
    const hasProperty = key in target2;
    if (!hasProperty)
      return true;
    const deleted = Reflect.deleteProperty(target2, key);
    if (!deleted)
      return false;
    const node = getNodeExisting(target2);
    batch(() => {
      var _a, _b, _c, _d, _e, _f;
      (_a = node.keys) == null ? void 0 : _a.observable.write(0);
      (_b = node.values) == null ? void 0 : _b.observable.write(0);
      (_d = (_c = node.has) == null ? void 0 : _c.get(key)) == null ? void 0 : _d.observable.write(false);
      const property = (_e = node.properties) == null ? void 0 : _e.get(key);
      if (StoreListenersRoots.active) {
        StoreListenersRoots.registerWith(property == null ? void 0 : property.node, node, key);
      }
      if (property == null ? void 0 : property.node) {
        lazySetDelete(property.node, "parents", node);
      }
      if (property) {
        (_f = property.observable) == null ? void 0 : _f.write(void 0);
        property.node = void 0;
      }
      if (StoreListenersRegular.active) {
        StoreListenersRegular.register(node);
      }
    });
    return true;
  },
  defineProperty: (target2, key, descriptor) => {
    const node = getNodeExisting(target2);
    const equals = node.equals || is;
    const hadProperty = key in target2;
    const descriptorPrev = Reflect.getOwnPropertyDescriptor(target2, key);
    if (descriptorPrev && isEqualDescriptor(descriptorPrev, descriptor, equals))
      return true;
    const defined = Reflect.defineProperty(target2, key, descriptor);
    if (!defined)
      return false;
    batch(() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (!descriptor.get) {
        (_a = node.getters) == null ? void 0 : _a.delete(key);
      } else if (descriptor.get) {
        node.getters || (node.getters = new StoreMap());
        node.getters.set(key, descriptor.get);
      }
      if (!descriptor.set) {
        (_b = node.setters) == null ? void 0 : _b.delete(key);
      } else if (descriptor.set) {
        node.setters || (node.setters = new StoreMap());
        node.setters.set(key, descriptor.set);
      }
      if (hadProperty !== !!descriptor.enumerable) {
        (_c = node.keys) == null ? void 0 : _c.observable.write(0);
        (_e = (_d = node.has) == null ? void 0 : _d.get(key)) == null ? void 0 : _e.observable.write(!!descriptor.enumerable);
      }
      const property = (_f = node.properties) == null ? void 0 : _f.get(key);
      if (StoreListenersRoots.active) {
        StoreListenersRoots.registerWith(property == null ? void 0 : property.node, node, key);
      }
      if (property == null ? void 0 : property.node) {
        lazySetDelete(property.node, "parents", node);
      }
      if (property) {
        if ("get" in descriptor) {
          (_g = property.observable) == null ? void 0 : _g.write(descriptor.get);
          property.node = void 0;
        } else {
          const value = descriptor["value"];
          (_h = property.observable) == null ? void 0 : _h.write(value);
          property.node = isProxiable(value) ? NODES.get(value) || getNode(value, node) : void 0;
        }
      }
      if (property == null ? void 0 : property.node) {
        lazySetAdd(property.node, "parents", node);
      }
      if (StoreListenersRoots.active) {
        StoreListenersRoots.registerWith(property == null ? void 0 : property.node, node, key);
      }
      if (StoreListenersRegular.active) {
        StoreListenersRegular.register(node);
      }
    });
    return true;
  },
  has: (target2, key) => {
    if (key === SYMBOL_STORE)
      return true;
    if (key === SYMBOL_STORE_TARGET)
      return true;
    const value = key in target2;
    if (isListenable()) {
      const node = getNodeExisting(target2);
      node.has || (node.has = new StoreMap());
      const has = node.has.get(key) || node.has.insert(key, getNodeHas(node, key, value));
      has.listen();
      has.observable.read();
    }
    return value;
  },
  ownKeys: (target2) => {
    const keys = Reflect.ownKeys(target2);
    if (isListenable()) {
      const node = getNodeExisting(target2);
      node.keys || (node.keys = getNodeKeys(node));
      node.keys.listen();
      node.keys.observable.read();
    }
    return keys;
  }
};
const STORE_UNTRACK_TRAPS = {
  /* API */
  has: (target2, key) => {
    if (key === SYMBOL_STORE_UNTRACKED)
      return true;
    return key in target2;
  }
};
const getNode = (value, parent, equals) => {
  const store2 = new Proxy(value, STORE_TRAPS);
  const signal = (parent == null ? void 0 : parent.signal) || ROOT;
  const gettersAndSetters = getGettersAndSetters(value);
  const node = { parents: parent, store: store2, signal };
  if (gettersAndSetters) {
    const { getters, setters } = gettersAndSetters;
    if (getters)
      node.getters = getters;
    if (setters)
      node.setters = setters;
  }
  if (equals === false) {
    node.equals = nope;
  } else if (equals) {
    node.equals = equals;
  } else if (parent == null ? void 0 : parent.equals) {
    node.equals = parent.equals;
  }
  NODES.set(value, node);
  return node;
};
const getNodeExisting = (value) => {
  const node = NODES.get(value);
  if (!node)
    throw new Error("Impossible");
  return node;
};
const getNodeFromStore = (store2) => {
  return getNodeExisting(getTarget(store2));
};
const getNodeKeys = (node) => {
  const observable2 = getNodeObservable(node, 0, { equals: false });
  const keys = new StoreKeys(node, observable2);
  return keys;
};
const getNodeValues = (node) => {
  const observable2 = getNodeObservable(node, 0, { equals: false });
  const values = new StoreValues(node, observable2);
  return values;
};
const getNodeHas = (node, key, value) => {
  const observable2 = getNodeObservable(node, value);
  const has = new StoreHas(node, key, observable2);
  return has;
};
const getNodeObservable = (node, value, options) => {
  const observable2 = new Observable(value, options);
  observable2.signal = node.signal;
  return observable2;
};
const getNodeProperty = (node, key, value) => {
  const observable2 = void 0;
  const propertyNode = isProxiable(value) ? NODES.get(value) || getNode(value, node) : void 0;
  const property = new StoreProperty(node, key, observable2, propertyNode);
  node.properties || (node.properties = new StoreMap());
  node.properties.set(key, property);
  return property;
};
const getGettersAndSetters = (value) => {
  if (isArray$1(value))
    return void 0;
  let getters;
  let setters;
  const keys = Object.keys(value);
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!descriptor)
      continue;
    const { get: get2, set } = descriptor;
    if (get2) {
      getters || (getters = new StoreMap());
      getters.set(key, get2);
    }
    if (set) {
      setters || (setters = new StoreMap());
      setters.set(key, set);
    }
  }
  if (!getters && !setters)
    return void 0;
  return { getters, setters };
};
const getStore = (value, options) => {
  if (isStore(value))
    return value;
  const node = NODES.get(value) || getNode(value, void 0, options == null ? void 0 : options.equals);
  return node.store;
};
const getTarget = (value) => {
  if (isStore(value))
    return value[SYMBOL_STORE_TARGET];
  return value;
};
const getUntracked = (value) => {
  if (!isObject$1(value))
    return value;
  if (isUntracked(value))
    return value;
  return new Proxy(value, STORE_UNTRACK_TRAPS);
};
const isEqualDescriptor = (a, b, equals) => {
  return !!a.configurable === !!b.configurable && !!a.enumerable === !!b.enumerable && !!a["writable"] === !!b["writable"] && equals(a["value"], b["value"]) && a.get === b.get && a.set === b.set;
};
const isListenable = () => {
  return TRACKING;
};
const isProxiable = (value) => {
  if (value === null || typeof value !== "object")
    return false;
  if (SYMBOL_STORE in value)
    return true;
  if (SYMBOL_STORE_UNTRACKED in value)
    return false;
  if (isArray$1(value))
    return true;
  const prototype = Object.getPrototypeOf(value);
  if (prototype === null)
    return true;
  return Object.getPrototypeOf(prototype) === null;
};
const isUntracked = (value) => {
  if (value === null || typeof value !== "object")
    return false;
  return SYMBOL_STORE_UNTRACKED in value;
};
const store = (value, options) => {
  if (!isObject$1(value))
    return value;
  if (isUntracked(value))
    return value;
  return getStore(value, options);
};
store.on = (target2, listener) => {
  const targets = castArray$1(target2);
  const selectors = targets.filter(isFunction$1);
  const nodes = targets.filter(isStore).map(getNodeFromStore);
  StoreListenersRegular.active += 1;
  const disposers = selectors.map((selector2) => {
    let inited = false;
    return reaction(() => {
      if (inited) {
        StoreListenersRegular.listeners.add(listener);
        StoreScheduler.schedule();
      }
      inited = true;
      selector2();
    });
  });
  nodes.forEach((node) => {
    lazySetAdd(node, "listenersRegular", listener);
  });
  return () => {
    StoreListenersRegular.active -= 1;
    disposers.forEach((disposer) => {
      disposer();
    });
    nodes.forEach((node) => {
      lazySetDelete(node, "listenersRegular", listener);
    });
  };
};
store._onRoots = (target2, listener) => {
  if (!isStore(target2))
    return noop;
  const node = getNodeFromStore(target2);
  if (node.parents)
    throw new Error("Only top-level stores are supported");
  StoreListenersRoots.active += 1;
  lazySetAdd(node, "listenersRoots", listener);
  return () => {
    StoreListenersRoots.active -= 1;
    lazySetDelete(node, "listenersRoots", listener);
  };
};
store.reconcile = (() => {
  const getType = (value) => {
    if (isArray$1(value))
      return 1;
    if (isProxiable(value))
      return 2;
    return 0;
  };
  const reconcileOuter = (prev, next) => {
    const uprev = getTarget(prev);
    const unext = getTarget(next);
    reconcileInner(prev, next);
    const prevType = getType(uprev);
    const nextType = getType(unext);
    if (prevType === 1 || nextType === 1) {
      prev.length = next.length;
    }
    return prev;
  };
  const reconcileInner = (prev, next) => {
    const uprev = getTarget(prev);
    const unext = getTarget(next);
    const prevKeys = Object.keys(uprev);
    const nextKeys = Object.keys(unext);
    for (let i = 0, l = nextKeys.length; i < l; i++) {
      const key = nextKeys[i];
      const prevValue = uprev[key];
      const nextValue = unext[key];
      if (!is(prevValue, nextValue)) {
        const prevType = getType(prevValue);
        const nextType = getType(nextValue);
        if (prevType && prevType === nextType) {
          reconcileInner(prev[key], nextValue);
          if (prevType === 1) {
            prev[key].length = nextValue.length;
          }
        } else {
          prev[key] = nextValue;
        }
      } else if (prevValue === void 0 && !(key in uprev)) {
        prev[key] = void 0;
      }
    }
    for (let i = 0, l = prevKeys.length; i < l; i++) {
      const key = prevKeys[i];
      if (!(key in unext)) {
        delete prev[key];
      }
    }
    return prev;
  };
  const reconcile = (prev, next) => {
    return batch(() => {
      return untrack(() => {
        return reconcileOuter(prev, next);
      });
    });
  };
  return reconcile;
})();
store.untrack = (value) => {
  return getUntracked(value);
};
store.unwrap = (value) => {
  return getTarget(value);
};
function observable(value, options) {
  return writable(new Observable(value, options));
}
const _with = () => {
  const owner2 = OWNER;
  return (fn) => {
    return owner2.wrap(() => fn());
  };
};
const CONTEXTS_DATA = /* @__PURE__ */ new WeakMap();
const HMR = !!globalThis.VOBY_HMR;
const SYMBOL_TEMPLATE_ACCESSOR = Symbol("Template Accessor");
const SYMBOLS_DIRECTIVES = {};
const SYMBOL_CLONE = Symbol("CloneElement");
const { assign } = Object;
const castArray = (value) => {
  return isArray(value) ? value : [value];
};
const flatten = (arr) => {
  for (let i = 0, l = arr.length; i < l; i++) {
    if (!isArray(arr[i]))
      continue;
    return arr.flat(Infinity);
  }
  return arr;
};
const { isArray } = Array;
const isBoolean = (value) => {
  return typeof value === "boolean";
};
const isFunction = (value) => {
  return typeof value === "function";
};
const isNil = (value) => {
  return value === null || value === void 0;
};
const isNode = (value) => {
  return value instanceof Node;
};
const isPrimitive = (value) => {
  const t = typeof value;
  return !(t === "object" || t === "function");
};
const isString = (value) => {
  return typeof value === "string";
};
const isSVG = (value) => {
  return !!value["isSVG"];
};
const isSVGElement = (() => {
  const svgRe = /^(t(ext$|s)|s[vwy]|g)|^set|tad|ker|p(at|s)|s(to|c$|ca|k)|r(ec|cl)|ew|us|f($|e|s)|cu|n[ei]|l[ty]|[GOP]/;
  const svgCache = {};
  return (element) => {
    const cached = svgCache[element];
    return cached !== void 0 ? cached : svgCache[element] = !element.includes("-") && svgRe.test(element);
  };
})();
const isTemplateAccessor = (value) => {
  return isFunction(value) && SYMBOL_TEMPLATE_ACCESSOR in value;
};
const useMicrotask = (fn) => {
  const disposed$1 = disposed();
  const runWithOwner = _with();
  queueMicrotask(() => {
    if (disposed$1())
      return;
    runWithOwner(fn);
  });
};
const useMicrotask$1 = useMicrotask;
export {
  batch as A,
  isBatching as B,
  isObservable as C,
  isStore as D,
  store as E,
  SYMBOL_OBSERVABLE as F,
  SYMBOL_OBSERVABLE_FROZEN as G,
  SYMBOL_UNCACHED as H,
  CONTEXTS_DATA as I,
  HMR as K,
  SYMBOLS_DIRECTIVES as L,
  isPrimitive as M,
  on as O,
  off as P,
  isArray as Q,
  SYMBOL_TEMPLATE_ACCESSOR as S,
  isNil as T,
  flatten as U,
  castArray as V,
  SYMBOL_STORE_OBSERVABLE as W,
  isBoolean as X,
  isTemplateAccessor as Y,
  isSVG as Z,
  _with as _,
  assign as b,
  isString as c,
  isSVGElement as d,
  isNode as e,
  get as g,
  effect as h,
  isFunction as i,
  context as j,
  reaction as k,
  SYMBOL_UNTRACKED_UNWRAPPED as m,
  SYMBOL_CLONE as n,
  memo as o,
  resolve as p,
  root as r,
  cleanup as s,
  disposed as t,
  untrack as u,
  useMicrotask$1 as w,
  observable as z
};
