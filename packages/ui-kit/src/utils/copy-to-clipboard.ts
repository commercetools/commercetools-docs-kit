const getSelection = (document: Document) => {
  const selection = document.getSelection();
  return selection && selection.rangeCount > 0
    ? selection.getRangeAt(0)
    : false;
};

const createTextArea = (document: Document, text: string) => {
  const el = document.createElement('textarea');
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px'; // Move outside the screen to make it invisible
  return el;
};

const copyToClipboard = (text: string) => {
  const el = createTextArea(document, text);
  const selected = getSelection(document);
  document.body.appendChild(el);
  el.select();

  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(selected);
  }
};

export default copyToClipboard;
