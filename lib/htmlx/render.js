const render = (host, vNode) => {
  console.log(host, vNode);
  if (typeof vNode === "string" ) {
    host.append(document.createTextNode(vNode));
  } else {
    let domNode;
    const { tag, children } = vNode;
    const { attributes, eventHandlers } = splitAttributes(vNode.attributes);
    if (typeof tag === "string") {
      if (tag === "") {
        domNode = new DocumentFragment();
      } else {
        domNode = document.createElement(tag);
        Object.entries(attributes).forEach(([attributeName, attributeValue]) => domNode.setAttribute(attributeName, attributeValue));
      }
      Object.entries(eventHandlers).forEach(([eventHandlerName, eventHandler]) => domNode.addEventListener(eventHandlerName, eventHandler));
      console.log("Rendering children", children);
      children.forEach(child => render(domNode, child));
      host.append(domNode);
    } else {
      render(host, tag({...vNode.attributes, children}));
    }
  }
};

const splitAttributes = (originalAttributes) => {
   return Object.entries(originalAttributes).reduce((container, [attributeName, attributeValue]) => {
     if (attributeName.match(/^on/)) {
       container.eventHandlers[attributeName.toLowerCase()] = attributeValue;
     } else {
       container.attributes[attributeName] = attributeValue;
     }
     return container;
   }, {
     attributes: {},
     eventHandlers: {},
   });
};

export default render;
