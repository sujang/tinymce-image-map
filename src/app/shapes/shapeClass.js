/*eslint no-console: ["error", {"allow": ["warn"]}]*/
import Point from "./point";
import MapArea from "../utils/mapArea";

class Shape {
  constructor(context) {
    this.id = Date.now();
    this.startPoint;
    this.endPoint;
    this.moveOffSet;
    this.dimensions = { frame: {}, shape: {} };
    this.context = context;
    this.drawing = true;
    this.moving = false;
    this.selected = false;
    this.resizing = false;
    this.path = new Path2D();
    this.strokeStyle = "#2f4f4f";
    this.href = "";
  }

  //ABSTRACT METHODS
  draw() {
    console.warn("Implement method to render the shape");
  }

  getArea() {
    console.warn("Implement method to return the shapes area in pixels");
  }

  getAreaCoords() {
    console.warn("Implement method to return the coordinates of the shape");
  }

  updateDimensions() {
    console.warn("Implement method to update the shape's dimensions/points");
  }

  updateCoordinates() {
    console.warn("Implement method to update the shape's location on canvas");
  }

  calcDrawCoords() {
    console.warn("Implement method to update shape's draw coordinates");
  }

  //CLASS METHODS
  contains(point) {
    return this.context.isPointInPath(this.path, point.x, point.y);
  }

  setMoveOffset(newPoint) {
    const { x, y } = {
      x: newPoint.x - this.startPoint.x,
      y: newPoint.y - this.startPoint.y
    };
    this.moveOffSet = new Point(x, y);
    return this;
  }

  updateStartPoint(newPoint) {
    const { x, y } = {
      x: newPoint.x - this.moveOffSet.x,
      y: newPoint.y - this.moveOffSet.y
    };
    this.startPoint = new Point(x, y);
    return this;
  }

  updateEndPoint(newPoint) {
    this.endPoint = newPoint;
    return this;
  }

  drag() {
    this.moving = true;
    return this;
  }

  drop() {
    this.moving = false;
    return this;
  }

  select() {
    this.selected = true;
    this.strokeStyle = "#C80000";
    return this;
  }

  deselect() {
    this.selected = false;
    this.strokeStyle = "#2f4f4f";
    return this;
  }

  finishDrawing() {
    this.drawing = false;
    return this;
  }

  setDrawCoords(coords) {
    this.startPoint = coords.start;
    this.endPoint = coords.end;
    this.moveOffSet = coords.start;
    return this;
  }

  setShapeDimensions(dimensions) {
    this.dimensions.shape = dimensions;
    return this;
  }

  setHref(href) {
    this.href = href;
    return this;
  }

  addTransparentFill(path) {
    this.context.globalAlpha = 0.3;
    this.context.fillStyle = "#c3c3c3";
    this.context.fill(path);
    this.context.globalAlpha = 1;
  }

  inUse() {
    return this.drawing || this.moving || this.resizing;
  }

  toMapArea() {
    const href = () => {
      if (!/https?:\/\//.test(this.href)) {
        return "http://" + this.href;
      }
      return this.href;
    };
    return new MapArea(this.type, this.getAreaCoords(), href());
  }
}

export default Shape;
