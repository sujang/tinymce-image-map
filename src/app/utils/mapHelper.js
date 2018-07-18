import MapArea from "./mapArea";

const clearAreas = map => {
  if (map) {
    const children = Array.from(map.children);
    for (let i = 0; i < children.length; i++) {
      map.removeChild(children[i]);
    }
  }
};

const generateUniqueMapName = maps => {
  const template = "tinymce-map";
  const condition = () => maps.find(map => map.name === name);
  let name = template;
  let counter = 1;
  while (condition()) {
    name = template + counter;
    counter++;
  }
  return name;
};

const addMapElement = (editor, img) => {
  const parent = img.parentNode;
  const name = generateUniqueMapName(Array.from(editor.dom.select("map")));
  editor.dom.add(parent, "map", { id: name, name: name });
  img.useMap = "#" + name;
  return editor.dom.select("map")[0];
};

const mapHelper = {
  load: elements => {
    return elements.map(el => new MapArea(el.shape, el.coords, el.href));
  },
  write: (editor, img) => {
    const app = document.app;
    const map =
      editor.dom.select("map").find(item => "#" + item.name === img.useMap) ||
      addMapElement(editor, img);
    clearAreas(map);
    app.shapes.forEach(shape => {
      let area = shape.toMapArea();
      let node = Object.assign(editor.dom.create("area"), area);
      map.append(node);
    });
  },
  addMapElement: addMapElement
};

export default mapHelper;
