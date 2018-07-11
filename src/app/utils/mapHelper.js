import MapArea from "./mapArea";

const mapHelper = {
  load: elements => {
    return elements.map(el => new MapArea(el.shape, el.coords, el.href));
  },
  write: (editor, img) => {
    const app = document.app;
    const map = editor.dom.select('map').length > 0
      ? editor.dom.select('map')[0]
      : addMapElement(editor, img);
    clearAreas(map);
    app.shapes.forEach(shape => {
      let area = shape.toMapArea();
      console.log(area);
      let node = Object.assign(editor.dom.create("area"), area);
      map.append(node);
    });
  }
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
  const template = "tinymce-map";
  const condition = () => maps.find(map => map.name === name);
  let name = template;
  let counter = 1;
  while (condition()) {
    name = template + counter;
    counter++;
  }
  return name;
}

export default mapHelper;
