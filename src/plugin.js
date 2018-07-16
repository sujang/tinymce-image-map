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
          minHeight: img.height + 80,
          minWidth: img.width
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
    view.createDialogHtml(editor).then(() => view.initApp(editor, img));
  }
};

const plugin = editor => {
  editor.addMenuItem("tinymceImageMap", {
    icon: 'img-map-icon',
    text: "Image Map",
    onclick: () => openDialog(editor)
  });

  editor.addButton("tinymceImageMap", {
    tooltip: 'Image Map',
    icon: 'img-map-icon',
    onclick: () => openDialog(editor)
  });
};

export default plugin;
