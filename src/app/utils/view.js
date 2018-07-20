import mapHelper from "./mapHelper";
import App from "../main";
import template from "./template.html";
import "./styles.css";

const view = {
  createDialogHtml: () => {
    return new Promise(resolve => {
      const container = document.getElementById("img-map-container");
      container.innerHTML = template;
      resolve(container);
    });
  },

  initApp: (editor, img) => {
    const map = editor.dom
      .select("map")
      .find(item => "#" + item.name === img.useMap);
    if (!map) {
      img.useMap = '';
    }
    const areas =
      img.useMap === "" ? [] : mapHelper.load(Array.from(map.children));
    const canvas = document.getElementById("img-map-canvas");
    canvas.setAttribute("height", img.height);
    canvas.setAttribute("width", img.width);
    const urlInput = document.getElementById("map-url-input");
    const shapeSelectors = document.getElementsByName("shapeSelect");
    const hint = document.getElementById("img-map-hint");
    const args = {
      canvas: canvas,
      hint: hint,
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
