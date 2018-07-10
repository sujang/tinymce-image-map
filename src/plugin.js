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
        view.destroy(editor, img);
      }
    });
    view.createDialogHtml(editor).then(() => view.initApp(editor, img));
  }
};

const plugin = editor => {
  editor.on("init", () => {
    if (editor.selection.getNode().nodeName !== "IMG") {
      editor.selection.select(editor.dom.select("img")[0]);
    }
  });

  editor.addMenuItem("tinymceImageMap", {
    text: "Image Map",
    onclick: () => openDialog(editor)
  });

  editor.addButton("tinymceImageMap", {
    text: "Image Map",
    icon: false,
    onclick: () => openDialog(editor)
  });
};

export default plugin;
