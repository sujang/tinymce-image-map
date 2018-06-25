import Circle from "./circle";
import Rectangle from "./rectangle";
import Polygon from './polygon';
import SHAPES from "./shapes";

const ShapeFactory = (shape, coords, context) => {
  switch (shape) {
    case SHAPES.CIRCLE:
      return new Circle(coords, context);
    case SHAPES.RECTANGLE:
      return new Rectangle(coords, context);
    case SHAPES.POLYGON:
      return new Polygon(coords, context);
    default:
      throw new Error('Invalid shape passed to constructor');
  }
};

export default ShapeFactory;
