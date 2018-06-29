import MapArea from "./mapArea";

const mapLoader = elements => {
  return elements.map(el => new MapArea(el.shape, el.coords, el.href));
};

export default mapLoader;
