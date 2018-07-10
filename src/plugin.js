import mapHelper from "./app/utils/mapHelper";
import App from "./app/main";

const openDialog = editor => {
  let isImg = editor.selection.getNode().nodeName === "IMG";
  if (isImg) {
    const img = editor.selection.getNode();
    // console.log(img.height, img.width)
    const map = editor.dom.select("map").find(item => item.name === img.useMap);
    const areas = img.useMap === "" ? [] : mapHelper.load(Array.from(map.children));
    editor.windowManager.open({
      title: "Manage Image Maps",
      body: [
        {
          type: "container",
          layout: "flex",
          direction: "column",
          align: "center",
          html: '<div id="img-map-container"></div>',
          minHeight: 700,
          minWidth: 900
        }
      ],
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
        mapHelper.write(editor, img);
        document.app = {};
        document.getElementById("img-map-container").innerHTML = "";
      }
    });
    createDialogHtml(editor);
    initialize(img, areas);
  }
};

const createDialogHtml = editor => {
  const container = document.getElementById("img-map-container");
  const canvas = editor.dom.create("canvas", { id: "canvas" });
  const actions = editor.dom.create("div", { id: "actions", class: "actions" });
  const template = `
  <span class="selection">
    <input type="radio" name="shapeSelect" id="shape1" value="circle">
    <label for="shape1">Circle</label>
    <input type="radio" name="shapeSelect" id="shape2" value="rectangle">
    <label for="shape2">Rectangle</label>
    <input type="radio" name="shapeSelect" id="shape3" value="polygon">
    <label for="shape3">Polygon</label>
  </span>
  <span class="buttons">
    <button type="button" onclick="app.clearCanvas(true)">Clear</button>
    <button type="button" onclick="app.deleteMap()">Delete Focused</button>
  </span>
  `;
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
  const styleSheet = editor.dom.create("link", {
    type: "text/css",
    rel: "stylesheet",
    href: "data:text/css;charset=UTF-8," + encodeURI(styles)
  });
  document.getElementsByTagName("head")[0].appendChild(styleSheet);
  actions.innerHTML = template;
  container.appendChild(canvas);
  container.appendChild(actions);
  return container;
};

const initialize = (img, areas) => {
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
