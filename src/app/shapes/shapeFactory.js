import Circle from "./circle";
import Rectangle from "./rectangle";
import Polygon from "./polygon";
import SHAPES from "./shapes";

const ShapeFactory = (shape, options) => {
  const { context, drawCoords, areaCoords, href } = options;
  let shapeObj;
  switch (shape) {
    case SHAPES.CIRCLE:
      shapeObj = new Circle(context);
      break;
    case SHAPES.RECTANGLE:
      shapeObj = new Rectangle(context);
      break;
    case SHAPES.POLYGON:
      shapeObj = new Polygon(context);
      break;
    default:
      throw new Error("Invalid shape passed to constructor: " + this.shape);
  }
  if (drawCoords) {
    shapeObj.setDrawCoords(drawCoords);
  }
  if (areaCoords) {
    shapeObj
      .setShapeDimensions(areaCoords)
      .calcDrawCoords()
      .finishDrawing();
  }
  if (href) {
    shapeObj.setHref(href);
  }
  return shapeObj;
};

export default ShapeFactory;
