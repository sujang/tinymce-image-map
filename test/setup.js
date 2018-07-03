import jsdom from "jsdom";
import "canvas";
import "canvas-5-polyfill";

const template = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body onload="render()">
  <div class="container">
    <canvas id="canvas" height="400" width="600">
      <p>
        Your browser does not meet the minimum requirements for this plugin. Please update your browser to a more recent version
        to enable this feature.
      </p>
    </canvas>
    <div class="actions">
      <input type="radio" name="shapeSelect" id="shape1" value="circle">
      <label for="shape1">Circle</label>
      <input type="radio" name="shapeSelect" id="shape2" value="rectangle">
      <label for="shape2">Rectangle</label>
      <input type="radio" name="shapeSelect" id="shape3" value="polygon">
      <label for="shape3">Polygon</label>
      <span class="buttons">
        <button type="button" onclick="app.clearCanvas(true)">Clear</button>
        <button type="button" onclick="app.deleteMap()">Delete Focused</button>
      </span>
    </div>
    <div>
      <h3>Current Map Coordinates</h3>
      <div id="maps"></div>
    </div>
  </div>
</body>

</html>
`;

const dom = new jsdom.JSDOM(template, { resources: "usable", runScripts: 'dangerously' });

global.window = dom.window;
global.document = window.document;
global.Image = window.Image;
global.navigator = { userAgent: "node.js" };
