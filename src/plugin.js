import mapReader from "./app/mapUtils/mapReader";
import mapWriter from "./app/mapUtils/mapWriter";
import App from "./app/main";

const openDialog = editor => {
  let isImg = editor.selection.getNode().nodeName === "IMG";
  if (isImg) {
    const img = editor.selection.getNode();
    // console.log(img.height, img.width)
    const map = editor.dom.select("map").find(item => item.name === img.useMap);
    const areas = img.useMap === "" ? [] : mapReader(Array.from(map.children));
    editor.windowManager.open({
      title: "Manage Image Maps",
      body: [
        {
          type: "container",
          layout: "flex",
          direction: "column",
          html: '<div id="container"></div>',
          minHeight: 700,
          minWidth: 900
        }
      ],
      width: 900,
      height: 700,
      buttons: [
        {
          text: "Close",
          onclick: "close"
        },
        {
          text: "Save",
          onclick: "submit"
        }
      ],
      onsubmit() {
        mapWriter(editor, img);
        document.app = {};
        document.getElementById('container').innerHTML = '';
      }
    });
    createDialogHtml(editor);
    initialize(img, areas);
  }
};

const createDialogHtml = editor => {
  const container = document.getElementById("container");
  const canvas = editor.dom.create("canvas", { id: "canvas" });
  const actions = editor.dom.create("div", { id: "actions" });
  const template = `
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
  `;
  actions.innerHTML = template;
  container.appendChild(canvas);
  container.appendChild(actions);
  return container;
};

const initialize = (img, areas) => {
  const canvas = document.getElementById('canvas');
  canvas.setAttribute('height', img.height);
  canvas.setAttribute('width', img.width);
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
};

const plugin = editor => {
  editor.on("init", () => {
    if (editor.selection.getNode().nodeName !== "IMG") {
      editor.selection.select(editor.dom.select("img")[0]);
    }
  });

  editor.addMenuItem("tinymceImageMap", {
    text: "Image Maps",
    onclick: () => openDialog(editor)
  });

  editor.addButton("tinymceImageMap", {
    text: "Image Map",
    icon: false,
    onclick: () => openDialog(editor)
  });
};

export default plugin;
