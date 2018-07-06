import ActionDispatcher from "./actions/actionDispatcher";
import ACTIONS from "./actions/actions";
import Point from "./shapes/point";
import SHAPES from "./shapes/shapes";

class App {
  constructor(args) {
    this.args = args;
    this.canvas = args.canvas;
    this.context = this.canvas.getContext("2d");
    this.shapeSelectors = args.shapeSelectors;
    this.currentDrawShape;
    this.currentAction;
    this.shapeInProgress;
    this.focusedShape;
    this.shapes = [];
    this.isMouseDown = false;
    this.img;
    console.log(args)
    this.canvas.addEventListener("mousedown", e => this.mouseDown(e), false);
    this.canvas.addEventListener("mousemove", e => this.mouseMove(e), false);
    this.canvas.addEventListener("mouseup", e => this.mouseUp(e), false);

    this.shapeSelectors.forEach(node =>
      node.addEventListener("change", () => this.setShape(), false)
    );

    this.init();
  }

  render() {
    if (this.canvas.getContext) {
      this.clearCanvas();
      this.drawImage();
      this.shapes.forEach(r => r.draw());
    }
  }

  mouseDown(e) {
    if (e.button === 0) {
      this.isMouseDown = true;
      const coords = this.getMouseCoords(e);
      this.determineAction(coords);
      ActionDispatcher[this.currentAction].onMouseDown(this, coords, e);
      this.render();
    }
    e.preventDefault();
  }

  mouseMove(e) {
    if (
      this.isMouseDown ||
      (this.shapeInProgress && this.shapeInProgress.inUse())
    ) {
      const coords = this.getMouseCoords(e);
      ActionDispatcher[this.currentAction].onMouseMove(this, coords, e);
      this.render();
    }
    e.preventDefault();
  }

  mouseUp(e) {
    if (this.isMouseDown) {
      this.isMouseDown = false;
      const coords = this.getMouseCoords(e);
      ActionDispatcher[this.currentAction].onMouseUp(this, coords, e);
      this.render();
    }
    e.preventDefault();
  }

  getMouseCoords(e) {
    const boundingRect = this.canvas.getBoundingClientRect();
    const x = Math.round(e.clientX - boundingRect.left);
    const y = Math.round(e.clientY - boundingRect.top);
    return new Point(x, y);
  }

  clearCanvas(del) {
    if (del) {
      this.shapeInProgress = undefined;
      this.focusedShape = undefined;
      this.shapes = [];
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawImage();
  }

  setShape() {
    const shapes = [...this.shapeSelectors];
    const selected = shapes.find(shape => shape.checked);
    selected !== undefined
      ? (this.currentDrawShape = SHAPES[selected.value.toUpperCase()])
      : (this.currentDrawShape = SHAPES.CIRCLE);
    if (!selected) {
      shapes.find(shape => shape.value === SHAPES.CIRCLE).checked = true;
    }
  }

  determineAction(coords) {
    const shape = this.shapes.find(shape => shape.contains(coords));
    if (shape) {
      if (shape.drawing) {
        return;
      }
      if (this.focusedShape) {
        this.focusedShape.deselect();
      }
      this.focusedShape = shape;
      this.currentAction = ACTIONS.MOVE;
    } else {
      if (this.focusedShape) {
        this.focusedShape.deselect();
      }
      this.currentAction = ACTIONS.DRAW;
    }
  }

  deleteMap() {
    if (this.focusedShape) {
      let index = this.shapes.findIndex(shape => shape.selected);
      this.shapes.splice(index, 1);
      this.focusedShape = undefined;
      this.render();
    }
  }

  loadImage() {
    this.img = new Image();
    this.img.onload = () => this.drawImage();
    this.img.height = this.args.img.height;
    this.img.width = this.args.img.width;
    this.img.src = this.args.img.src;
    console.log(this.img);
  }

  drawImage() {
    const srcSize = [0, 0, this.img.width, this.img.height];
    const destSize = [0, 0, this.canvas.width, this.canvas.height];
    // console.log(srcSize);
    // console.log(destSize);
    this.context.imageSmoothingEnabled = false;
    this.context.drawImage(this.img, ...srcSize, ...destSize);
  }

  init() {
    this.setShape();
    this.loadImage();
    this.args.map.areas.forEach(area => {
      let shape = area.toShape(this.context);
      this.shapes.push(shape);
    });
  }
}

export default App;
