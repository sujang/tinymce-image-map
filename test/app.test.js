/*eslint no-undef: 0*/
import sinon from "sinon";
import sinonChai from "sinon-chai";
import chai from "chai";
import App from "../src/app/main";
import mapHelper from "../src/app/utils/mapHelper";

chai.should();
chai.use(sinonChai);

describe("Main application", () => {
  before(() => init());

  after(() => {
    App.prototype.drawImage.restore();
    App.prototype.loadImage.restore();
    App.prototype.setShape.restore();
  });

  it("should be initialized", () => {
    window.onModulesLoaded = () => {
      window.app.should.exist;
      window.app.setShape.should.have.been.calledOnce;
      window.app.loadImage.should.have.been.calledOnce;
      window.app.drawImage.should.have.been.calledOnce;
    };
  });

  it("should have a configured canvas and context", () => {
    window.app.canvas.should.exist;
    window.app.canvas.height.should.equal(480);
    window.app.canvas.width.should.equal(640);
    window.app.context.should.exist;
    window.app.context.canvas.should.deep.equal(window.app.canvas);
  });

  it("should load with valid initial state", () => {
    window.app.currentDrawShape.should.equal("circle");
    should.not.exist(window.app.currentAction);
    should.not.exist(window.app.focusedShape);
    should.not.exist(window.app.shapeInProgress);
    window.app.shapes.length.should.equal(1);
  });

  it("should load image", () => {
    window.app.img.should.exist;
    window.app.img.src.should.equal("./static/assets/bulbs.jpeg");
    window.app.img.width.should.equal(640);
    window.app.img.height.should.equal(480);
  });

  it("should load map area as a shape on canvas", () => {
    const shape = window.app.shapes[0];
    shape.type.should.equal("circle");
    shape.href.should.equal("https://www.google.com/");
    shape.dimensions.shape.should.deep.equal({ cx: 50, cy: 50, r: 45 });
  });

  it("clearCanvas() should remove all shapes", () => {
    window.onModulesLoaded = () => {
      sinon.spy(window.app, "clearCanvas");
      window.app.clearCanvas();
      window.app.shapes.length.should.equal(0);
      window.app.clearCanvas.should.have.been.calledOnce;
      window.app.drawImage.should.have.been.calledOnce;
      should.not.exist(window.app.focusedShape);
      should.not.exist(window.app.shapeInProgress);
      window.app.clearCanvas.restore();
    };
  });
});

function init() {
  const img = document.createElement("img");
  img.src = "./static/assets/bulbs.jpeg";
  img.height = "480";
  img.width = "640";
  img.useMap = "testmap";

  const canvas = document.createElement('canvas');
  canvas.height = img.height;
  canvas.width = img.width;

  const map = document.createElement("map");
  map.name = "testmap";

  const areaCircle = document.createElement("area");
  areaCircle.shape = "circle";
  areaCircle.href = "https://www.google.com";
  areaCircle.coords = "50,50,45";
  areaCircle.target = "_blank";
  map.appendChild(areaCircle);

  const shapeSelect = document.createElement('input');
  shapeSelect.type = 'radio';
  shapeSelect.name = 'shapeSelect';
  shapeSelect.id = 'shape1';
  shapeSelect.value = 'circle';

  const urlInput = document.createElement('input');
  urlInput.type = 'url';
  urlInput.name = 'map-url-input';

  const areas = mapHelper.load(Array.from(map.children));
  const args = {
    img: {
      src: img.src,
      height: img.height,
      width: img.width,
      useMap: img.useMap
    },
    map: {
      name: img.useMap,
      areas: areas
    },
    canvas: canvas,
    shapeSelectors: [shapeSelect],
    urlInput: urlInput
  };

  sinon.spy(App.prototype, "drawImage");
  sinon.spy(App.prototype, "loadImage");
  sinon.spy(App.prototype, "setShape");

  const app = new App(args);
  window.app = app;
  app.init();
}
