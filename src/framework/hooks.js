import { isFunction } from '../utils';

export const current = {
  shouldReRender: true,
  wipComponent: null,
  hookIndex: null,
};

export function createFunctionElement(tag, props, children) {
  current.wipComponent = tag;
  current.hookIndex = 0;
  current.wipComponent.hooks = current.wipComponent.hooks || [];

  return tag({ ...props, children }, children);
}

export function useState(initial) {
  const { wipComponent, hookIndex } = current;
  const oldHook = wipComponent.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];

  actions.forEach(action => {
    hook.state = isFunction(action) ? action(hook.state) : action;
  });

  const setState = action => {
    current.shouldReRender = true;
    hook.queue.push(action);
  };

  wipComponent.hooks[hookIndex] = hook;
  current.hookIndex++;
  return [hook.state, setState];
}

export function useEffect(effect, deps) {
  const { wipComponent, hookIndex } = current;
  const oldHook = wipComponent.hooks[hookIndex];
  const oldDeps = oldHook ? oldHook.deps : undefined;

  const hasChanged = hasDepsChanged(oldDeps, deps);

  current.hookIndex++;

  if (!hasChanged) return;

  if (oldHook && oldHook.unmount) {
    window.removeEventListener('beforeunload', oldHook.unmount);
  }

  wipComponent.hooks[hookIndex] = {
    unmount: effect(),
    deps,
  };

  window.addEventListener('beforeunload', wipComponent.hooks[hookIndex].unmount);
}

const hasDepsChanged = (prevDeps, nextDeps) =>
  !prevDeps ||
  !nextDeps ||
  prevDeps.length !== nextDeps.length ||
  prevDeps.some((dep, index) => dep !== nextDeps[index]);

export const useContext = Context => Context.value;
