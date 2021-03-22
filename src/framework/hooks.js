export const current = {
  shouldReRender: true,
  current: null,
  hookIndex: null,
};

export function createFunctionComponent(tag, props, children) {
  current.wipFiber = tag;
  current.hookIndex = 0;
  current.wipFiber.hooks = current.wipFiber.hooks || [];

  return tag({ ...props, children }, children);
}

export function useState(initial) {
  const { wipFiber, hookIndex } = current;
  const oldHook = wipFiber.hooks[hookIndex];
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: [],
  };

  const actions = oldHook ? oldHook.queue : [];

  actions.forEach((action) => {
    hook.state = action(hook.state);
  });

  const setState = (action) => {
    current.shouldReRender = true;
    hook.queue.push(action);
  };

  wipFiber.hooks[hookIndex] = hook;
  current.hookIndex++;
  return [hook.state, setState];
}
