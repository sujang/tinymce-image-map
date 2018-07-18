/*eslint no-console: ["error", {"allow": ["error"]}]*/
import SHAPES from "../shapes/shapes";
import ShapeFactory from "../shapes/shapeFactory";

class MapArea {
  constructor(shape, coords, href) {
    this.shape = shape;
    this.coords =
      typeof coords === "string" ? coords : this.formatCoordsToString(coords);
    this.href = href;
    this.target = "_blank";
  }

  formatCoordsToString(coords) {
    switch (this.shape) {
      case SHAPES.CIRCLE:
        return `${coords.cx},${coords.cy},${coords.r}`;
      case SHAPES.RECTANGLE:
        return `${coords.x},${coords.y},${coords.x + coords.w},${coords.y +
          coords.h}`;
      case SHAPES.POLYGON:
        return coords.map(pair => `${pair.x},${pair.y}`).join(",");
      default:
        throw new Error("Invalid shape passed to constructor");
    }
  }

  formatCoordsToObjectDimensions(coords) {
    let temp = coords.split(",").map(item => Number(item));
    switch (this.shape) {
      case SHAPES.CIRCLE:
        return {
          cx: Number(temp[0]),
          cy: Number(temp[1]),
          r: Number(temp[2])
        };
      case SHAPES.RECTANGLE:
        return {
          x: temp[0],
          y: temp[1],
          w: Math.round(temp[2] - temp[0]),
          h: Math.round(temp[3] - temp[1])
        };
      case SHAPES.POLYGON: {
        const points = [];
        for (let i = 0; i < temp.length; i += 2) {
          let point = { x: temp[i], y: temp[i + 1] };
          points.push(point);
        }
        return points;
      }
    }
  }

  toShape(context) {
    const coords = this.formatCoordsToObjectDimensions(this.coords);
    return new ShapeFactory(this.shape, {
      areaCoords: coords,
      context: context,
      href: this.href
    });
  }
}

export default MapArea;
