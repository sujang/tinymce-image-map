import Shape from "./shapeClass";

class Rectangle extends Shape {
  constructor(context) {
    super(context);
    this.type = "rect";
  }

  draw() {
    this.path = new Path2D();
    this.path.rect(
      this.dimensions.shape.x,
      this.dimensions.shape.y,
      this.dimensions.shape.w,
      this.dimensions.shape.h
    );
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke(this.path);
    this.addTransparentFill(this.path);
  }

  getArea() {
    return this.dimensions.shape.w * this.dimensions.shape.h;
  }

  getAreaCoords() {
    return this.dimensions.shape;
  }

  updateDimensions() {
    const width = this.endPoint.x - this.startPoint.x;
    const height = this.endPoint.y - this.startPoint.y;
    this.dimensions.shape = {
      x: this.startPoint.x,
      y: this.startPoint.y,
      w: Math.round(width),
      h: Math.round(height)
    };
    this.dimensions.frame = Object.assign({}, this.dimensions.shape);
    return this;
  }

  updateCoordinates() {
    this.dimensions.shape = Object.assign(this.dimensions.shape, {
      x: this.startPoint.x,
      y: this.startPoint.y
    });
    this.dimensions.frame = Object.assign({}, this.dimensions.shape);
    return this;
  }

  calcDrawCoords() {
    this.startPoint = {
      x: this.dimensions.shape.x,
      y: this.dimensions.shape.y
    };
    this.endPoint = {
      x: this.dimensions.shape.x + this.dimensions.shape.w,
      y: this.dimensions.shape.y + this.dimensions.shape.h
    };
    this.moveOffSet = Object.assign({}, this.startPoint);
    return this;
  }
}

export default Rectangle;
