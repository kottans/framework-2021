// https://gist.github.com/lygaret/a68220defa69174bdec5
// https://github.com/trueadm/t7
const htmlx = function(stringFragments, ...jsEntities) {
  console.log(jsEntities);

  const document = makeDocument(stringFragments);
  console.log(document);
  const nodeTree = transformDomNode(document,jsEntities);

  return document;
};

const makeDocument = (fragments) => {
  const htmlString =
    fragments.reduce((htmlFragments, fragment, index, fragments) => {
      htmlFragments.push(fragment);
      if (index < fragments.length - 1) {
        htmlFragments.push(`x__${index}`);
      }
      return htmlFragments;
      }, []).join('');
  const document = (new DOMParser()).parseFromString(htmlString, "text/xml");
  const parserErrors = document.querySelectorAll("parsererror");
  Array.from(parserErrors).forEach(error => {
    console.log("htmlx parser error: ", error.children[1].innerText, "ignore ending tag mismatch error");
    error.remove()
  });
  return document;

  /* const body = (new DOMParser()).parseFromString(htmlString, "text/html").body;
  const documentFragment = new DocumentFragment();
  Array.from(body.children).forEach(bodyChild => {
    documentFragment.appendChild(bodyChild);
  });
  return documentFragment; */
};

const placeHolderRegex = /(x__(\d)+)/;

const transformDomNode = (node, jsEntities) => {
  // text nodes
  if (node.nodeValue) {
    const nodeValue = node.nodeValue.trim();
    if (nodeValue.length === 0) return undefined;
    const [, placeholder, placeholderIndex] = nodeValue.match(placeHolderRegex) ?? [, undefined, undefined];
    return placeholder
      ? nodeValue.split[placeholder].join(jsEntities[parseInt(placeholderIndex)]) // jsEntities[parseInt(placeholder[2])]
      : nodeValue;
  }

  // process children
  const children = node.childNodes
    ? Array.from(node.childNodes)
      .map(child => transformDomNode(child, jsEntities))
      .filter(child => child !== undefined)
    : [];

  // process attributes
  console.log(node, 'attr', node.attributes);

  // process custom node / tag: send children, attributes etc
  const placeholder = node.localName.match(placeHolderRegex);
  if (placeholder) {
    // custom node
  } else {
    // html tag

  }

};



const isComponent = (item) => typeof item === 'function' && item.name.charAt(0).toUpperCase() === item.name.charAt(0);

export default htmlx;
