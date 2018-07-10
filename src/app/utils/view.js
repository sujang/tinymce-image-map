import mapHelper from "./mapHelper";
import App from "../main";

const actionsTemplate = () => {
  return `
    <span class="selection">
      <input type="radio" name="shapeSelect" id="shape1" value="circle">
      <label for="shape1">Circle</label>
      <input type="radio" name="shapeSelect" id="shape2" value="rectangle">
      <label for="shape2">Rectangle</label>
      <input type="radio" name="shapeSelect" id="shape3" value="polygon">
      <label for="shape3">Polygon</label>
    </span>
    <span class="buttons">
      <button type="button" class="mce-btn" onclick="app.clearCanvas(true)">Clear</button>
      <button type="button" class="mce-btn" onclick="app.deleteMap()">Delete Focused</button>
    </span>
  `;
};

const inputs = () => {
  return `
    <label for="url" class="mce-widget mce-label">enter valid link URL</label>
    <input type="url" id="url" name="url" class="mce-textbox" required/>
  `;
};

const styleSheetLink = () => {
  const styles = `
    .img-map-container,
    .actions {
      padding-top: 1rem;
    }
    .actions {
      display: flex;
    }
    #canvas {
      display: block;
      margin: auto;
      border: 1px solid #AAAAAA;
    }
  `;
  return "data:text/css;charset=UTF-8," + encodeURI(styles);
};

const view = {
  createDialogHtml: editor => {
    return new Promise(resolve => {
      const container = document.getElementById("img-map-container");
      //Add canvas
      const canvas = editor.dom.create("canvas", { id: "canvas" });
      container.appendChild(canvas);
      //Add actions
      const actions = editor.dom.create("div", {
        id: "actions",
        class: "actions"
      });
      actions.innerHTML = actionsTemplate();
      container.appendChild(actions);
      //Add styles
      const styleSheet = editor.dom.create("link", {
        type: "text/css",
        rel: "stylesheet",
        href: styleSheetLink()
      });
      document.getElementsByTagName("head")[0].appendChild(styleSheet);
      // Add inputs
      const form = editor.dom.create('form', { id: 'img-map-form' });
      form.innerHTML = inputs();
      container.appendChild(form);
      resolve(container);
    });
  },

  initApp: (editor, img) => {
    const map = editor.dom.select("map").find(item => item.name === img.useMap);
    const areas =
      img.useMap === "" ? [] : mapHelper.load(Array.from(map.children));
    const canvas = document.getElementById("canvas");
    canvas.setAttribute("height", img.height);
    canvas.setAttribute("width", img.width);
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
      shapeSelectors: shapeSelectors
    };
    const app = new App(args);
    document.app = app;
    app.init();
  },

  destroy: (editor, img) => {
    mapHelper.write(editor, img);
    document.app = {};
    document.getElementById("img-map-container").innerHTML = "";
  }
};

export default view;
