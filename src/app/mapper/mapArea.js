/*eslint no-console: ["error", {"allow": ["error"]}]*/
import SHAPES from "../shapes/shapes";

class MapArea {
  constructor(shape, coords, href) {
    this.shape = shape;
    this.coords = typeof coords === 'string' ? coords : this.formatCoords(coords);
    this.href = href;
  }

  formatCoords(coords) {
    switch (this.shape) {
      case SHAPES.CIRCLE:
        return `${coords.cx},${coords.cy},${coords.r}`;
      case SHAPES.RECTANGLE:
        return `${coords.startX},${coords.startY},${coords.endX},${coords.endY}`;
      case SHAPES.POLYGON:
        return coords.map(pair => `${pair.x},${pair.y}`).join(',');
      default:
        throw new Error("Invalid shape passed to constructor");
    }
  }
}

export default MapArea;
