function replaceText(node) {
  // Don't modify nodes that are inside an input field or textarea
  if (node.nodeType === Node.ELEMENT_NODE && (node.tagName === "INPUT" || node.tagName === "TEXTAREA")) {
    return;
  }
  // Replace the text if it's a text node
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = node.textContent.replace(/milk/gi, "vegan milk alternative");
  }
  // Recursively traverse all child nodes
  for (let i = 0; i < node.childNodes.length; i++) {
    replaceText(node.childNodes[i]);
  }
}

// Replace the text on the current page
replaceText(document.body);

// Replace the text whenever the user navigates to a new page
chrome.webNavigation.onCommitted.addListener(function(details) {
  chrome.tabs.executeScript({
    code: "replaceText(document.body)"
  });
});
