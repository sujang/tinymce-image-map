import mapHelper from "./mapHelper";
import App from "../main";
import "./styles.css";

const actionsTemplate = () => {
  return `
    <span class="img-map-selection">
      <span class="img-map-shape-select">
        <input type="radio" name="shapeSelect" id="shape1" value="circle">
        <label for="shape1">Circle</label>
      </span>
      <span class="img-map-shape-select">
        <input type="radio" name="shapeSelect" id="shape2" value="rectangle">
        <label for="shape2">Rectangle</label>
      </span>
      <span class="img-map-shape-select">
        <input type="radio" name="shapeSelect" id="shape3" value="polygon">
        <label for="shape3">Polygon</label>
      </span>
    </span>
    <span class="img-map-buttons">
      <button type="button" class="img-map-btn" onclick="app.clearCanvas(true)">Clear</button>
      <button type="button" class="img-map-btn" onclick="app.deleteMap()">Delete Focused</button>
    </span>
  `;
};

const inputs = () => {
  return `
    <label for="url">URL: </label>
    <input type="url" id="map-url-input" name="map-url-input" class="img-map-url-input" placeholder="https://www.validurl.com" required/>
  `;
};

const view = {
  createDialogHtml: editor => {
    return new Promise(resolve => {
      const container = document.getElementById("img-map-container");
      //Add canvas
      const canvas = editor.dom.create("canvas", { id: "img-map-canvas" });
      container.appendChild(canvas);
      //Add actions
      const actions = editor.dom.create("div", { id: "img-map-actions" });
      actions.innerHTML = actionsTemplate();
      container.appendChild(actions);
      // Add inputs
      const form = editor.dom.create("form", { id: "img-map-form" });
      form.innerHTML = inputs();
      container.appendChild(form);
      resolve(container);
    });
  },

  initApp: (editor, img) => {
    const map = editor.dom.select("map").find(item => item.name === img.useMap);
    const areas =
      img.useMap === "" ? [] : mapHelper.load(Array.from(map.children));
    const canvas = document.getElementById("img-map-canvas");
    canvas.setAttribute("height", img.height);
    canvas.setAttribute("width", img.width);
    const urlInput = document.getElementById("map-url-input");
    const shapeSelectors = document.getElementsByName("shapeSelect");
    const args = {
      canvas: canvas,
      img: {
        src: img.src,
        height: img.height,
        width: img.width,
        useMap: img.useMap
      },
      map: {
        name: img.useMap,
        areas: areas
      },
      shapeSelectors: shapeSelectors,
      urlInput: urlInput
    };
    const app = new App(args);
    document.app = app;
    app.init();
  },

  destroy: (editor, img) => {
    document.getElementById("map-url-input").blur();
    mapHelper.write(editor, img);
    document.app = {};
    document.getElementById("img-map-container").innerHTML = "";
  }
};

export default view;
