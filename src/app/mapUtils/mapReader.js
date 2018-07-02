import MapArea from "./mapArea";

const mapReader = elements => {
  return elements.map(el => new MapArea(el.shape, el.coords, el.href));
};

export default mapReader;
