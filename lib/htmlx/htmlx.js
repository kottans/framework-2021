// https://gist.github.com/lygaret/a68220defa69174bdec5
// https://github.com/trueadm/t7
const htmlx = function(stringFragments, ...jsEntities) {
  console.log(stringFragments, jsEntities);

  const document = makeDocument(Array.from(stringFragments), jsEntities);
  console.log('DOCUMENT', document);
  const nodeTree = transformDomNode(document, jsEntities);
  console.log('NODETREE', nodeTree);

  return nodeTree;
};

const vNode = (tag, attributes = [], children = []) => createPristineObject({
  tag,
  attributes,
  children,
});

const makeDocument = (stringFragments, jsEntities) => {
  /* Problem: DOM parser throws an error if the source contains more than one top elements
     Solution: Wrap the htmlx in an HTML element; then extract its children to have the proper
       representation of the original source
   */
  stringFragments[0] = '<template>' + stringFragments[0];
  stringFragments[stringFragments.length - 1] += '</template>';
  console.log(stringFragments, stringFragments.length);

  const htmlString =
    stringFragments.reduce((htmlFragments, fragment, index, stringFragments) => {
      htmlFragments.push(fragment);
      if (index < stringFragments.length - 1) {
        htmlFragments.push(`x__${jsEntities.findIndex(e => e === jsEntities[index])}`);
      }
      return htmlFragments;
      }, []).join('');
  console.log("mkDoc string", htmlString);
  const document = (new DOMParser()).parseFromString(htmlString, "text/xml");
  console.log("mkDoc doc", document);
  const parserErrors = document.querySelectorAll("parsererror");
  Array.from(parserErrors).forEach(error => {
    console.error("htmlx parser error: ", error.children[1].innerText, "ignore ending tag mismatch error");
    error.remove();
  });
  console.log(document.querySelector('template'));
  const documentFragment = new DocumentFragment();
  documentFragment.replaceChildren(...document.querySelector('template').children);

  return documentFragment;
};

const placeHolderRegex = /(x__(\d+))/;

const transformDomNode = (node, jsEntities) => {
  // text nodes
  if (node.nodeValue) {
    const nodeValue = node.nodeValue.trim();
    if (nodeValue.length === 0) return undefined;
    const [, placeholder, placeholderIndex] = nodeValue.match(placeHolderRegex) ?? [, undefined, undefined];
    return placeholder
      ? nodeValue.split[placeholder].join(jsEntities[parseInt(placeholderIndex)])
      : nodeValue;
  }

  // process children
  const children = node.childNodes
    ? Array.from(node.childNodes)
      .map(child => transformDomNode(child, jsEntities))
      .filter(child => child !== undefined)
    : [];

  // process attributes
  const attributes = node.attributes
    ? Array.from(node.attributes).reduce((attributes, attribute) => {
      const [, placeholder, placeholderIndex] = attribute.value.match(placeHolderRegex) ?? [, undefined, undefined];
      attributes[attribute.name] = placeholder ? jsEntities[parseInt(placeholderIndex)] : attribute.value;
      // console.log('ATTR', attribute.name,  placeholder ? jsEntities[parseInt(placeholderIndex)] : attribute.value);
      return attributes;
      }, {})
    : {};

  let tag = "";
  if (node.localName) {
    // process custom node / tag: send children, attributes etc
    const [, placeholder, placeholderIndex] = node.localName.match(placeHolderRegex) ?? [, undefined, undefined];
    tag = placeholder
      ? jsEntities[parseInt(placeholderIndex)]
      : node.localName;
  }
  // console.log('NODE', node, tag, attributes, children);
  return vNode(tag, attributes, children);
};

function createPristineObject(object) {
  object.__proto__ = null;
  return object;
}

export default htmlx;
