const mapWriter = (editor, map, img) => {
  const app = document.app;
  let mapNode = map;
  if (!map) {
    mapNode = addMapElement(editor, img);
  }
  clearAreas(map);
  app.shapes.forEach(shape => {
    let area = shape.toMapArea();
    let node = Object.assign(editor.dom.create("area"), area);
    mapNode.append(node);
  });
};

function clearAreas(map) {
  const children = Array.from(map.children);
  for (let i = 0; i < children.length; i++) {
    map.removeChild(children[i]);
  }
}

function addMapElement(editor, img) {
  const body = editor.getBody();
  const name = generateUniqueMapName(Array.from(editor.dom.select("map")));
  editor.dom.add(body, "map", { id: name, name: name });
  img.useMap = name;
}

function generateUniqueMapName(maps) {
  let template = "tinymce-map";
  let name = template;
  let counter = 1;
  let condition = maps.find(map => map.name === name);
  while (condition()) {
    name = template + counter;
    counter++;
  }
  return name;
}

export default mapWriter;
