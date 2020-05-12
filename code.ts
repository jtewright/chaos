// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getRand() {
  return Math.random();
}

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'create-rectangle') {
    const nodes: SceneNode[] = [];
    const rect = figma.createRectangle();
    const rVal = getRand();
    const gVal = getRand();
    const bVal = getRand();
    rect.fills = [{type: 'SOLID', color: {r: rVal, g: gVal, b: bVal}}];
    const length = getRandomInt(msg.max);
    rect.resize(length,length);
    figma.currentPage.appendChild(rect);
    nodes.push(rect);
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  if (msg.type === 'cancel') {
    figma.closePlugin();
  }
};
