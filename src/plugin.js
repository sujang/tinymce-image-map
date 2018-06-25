import mapLoader from "./app/mapper/mapLoader";

const openDialog = editor => {
  let isImg = editor.selection.getNode().nodeName === "IMG";
  if (isImg) {
    const img = editor.selection.getNode();
    const map = editor.dom.select("map").find(item => item.name === img.useMap);
    const areas = img.useMap === "" ? [] : mapLoader(Array.from(map.children));
    editor.windowManager.open(
      {
        title: "Manage Image Maps",
        url: "./plugin.html",
        width: 900,
        height: 700,
        buttons: [
          {
            text: "Close",
            onclick: "close"
          }
        ],
        onsubmit(e) {
          //TODO: Create/Update Image Maps
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(e.data, null, 2));
        }
      },
      {
        img: {
          src: img.src,
          height: img.height,
          width: img.width,
          useMap: img.useMap
        },
        map: {
          name: img.useMap,
          areas: areas
        }
      }
    );
  }
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
