figma.showUI(__html__);
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function getRand() {
    return Math.random();
}
figma.ui.onmessage = msg => {
    if (msg.type === 'create-rectangle') {
        const nodes = [];
        const rect = figma.createRectangle();
        const rVal = getRand();
        const gVal = getRand();
        const bVal = getRand();
        rect.fills = [{ type: 'SOLID', color: { r: rVal, g: gVal, b: bVal } }];
        const length = getRandomInt(msg.max);
        rect.resize(length, length);
        figma.currentPage.appendChild(rect);
        nodes.push(rect);
        figma.currentPage.selection = nodes;
        figma.viewport.scrollAndZoomIntoView(nodes);
    }
    if (msg.type === 'cancel') {
        figma.closePlugin();
    }
};
