import MapArea from "./mapArea";

const mapLoader = elements => {
  const areas = elements.map(el => new MapArea(el.shape, el.coords, el.href));
  return areas;
};

export default mapLoader;
