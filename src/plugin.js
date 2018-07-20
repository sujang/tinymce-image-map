import view from "./app/utils/view";

const openDialog = editor => {
  let isImg = editor.selection.getNode().nodeName === "IMG";
  if (isImg) {
    const img = editor.selection.getNode();
    editor.windowManager.open({
      title: "Manage Image Maps",
      body: [
        {
          type: "container",
          layout: "flex",
          direction: "column",
          align: "center",
          html: '<div id="img-map-container"></div>',
          minHeight: img.height < 800 ? img.height + 100 : 900,
          minWidth: img.width > 450 ? img.width : 450,
          autoScroll: true
        }
      ],
      buttons: [
        {
          text: "Done",
          onclick: "submit"
        }
      ],
      onsubmit() {
        view.destroy(editor, img);
      }
    });
    view.createDialogHtml().then(() => view.initApp(editor, img));
  }
};

const plugin = editor => {
  editor.on("init", () => {
    editor.dom.select("area").forEach(area => (area.style.cursor = "text"));
  });

  editor.on("click", e => {
    if (e.target.nodeName === "AREA") {
      let map = e.target.parentNode;
      editor.selection.select(
        editor.dom.select("img").find(img => img.useMap === "#" + map.name)
      );
    }
  });

  editor.addMenuItem("imageMap", {
    icon: "img-map-icon",
    text: "Image Map",
    onclick: () => openDialog(editor)
  });

  editor.addButton("imageMap", {
    tooltip: "Image Map",
    icon: "img-map-icon",
    onclick: () => openDialog(editor)
  });
};

export default plugin;
