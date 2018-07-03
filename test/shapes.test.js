import "chai/register-should";
import MapArea from "../src/app/mapUtils/mapArea";
import Circle from "../src/app/shapes/circle";
import Rectangle from "../src/app/shapes/rectangle";
import Polygon from "../src/app/shapes/polygon";

describe("Shape tests", () => {
  describe("Circle tests", () => {
    let area, shape;

    before(() => {
      area = new MapArea("circle", "50,50,10", "https://www.google.com");
      shape = area.toShape();
    });

    it("factory should return a circle", () => {
      shape.type.should.equal("circle");
      shape.should.be.an.instanceof(Circle);
    });

    it("should not be in use", () => {
      shape.inUse().should.be.false;
    });

    it("its coords should equal { cx: 50, cy: 50, r: 10 }", () => {
      shape.getAreaCoords().should.deep.equal({ cx: 50, cy: 50, r: 10 });
    });

    it("its area should equal 314 pixels", () => {
      shape.getArea().should.equal(314);
    });

    it("toMapArea() should generate valid area element", () => {
      shape.toMapArea().should.deep.equal(area);
    });

    it("updateCoordinates() should update its location", () => {
      shape
        .setMoveOffset({ x: 50, y: 50 })
        .updateStartPoint({ x: 60, y: 60 })
        .updateCoordinates();
      shape.getAreaCoords().should.deep.equal({ cx: 60, cy: 60, r: 10 });
    });
  });

  describe("Rectangle Tests", () => {
    let area, shape;

    before(() => {
      area = new MapArea("rect", "50,50,100,100", "https://www.google.com");
      shape = area.toShape();
    });

    it("factory should return a rectangle", () => {
      shape.type.should.equal("rect");
      shape.should.be.an.instanceof(Rectangle);
    });

    it("should not be in use", () => {
      shape.inUse().should.be.false;
    });

    it("its coords should equal { x: 50, y: 50, w: 50, h:50 }", () => {
      shape.getAreaCoords().should.deep.equal({ x: 50, y: 50, w: 50, h: 50 });
    });

    it("its area should equal 2,500 pixels", () => {
      shape.getArea().should.equal(2500);
    });

    it("toMapArea() should generate valid area element", () => {
      shape.toMapArea().should.deep.equal(area);
    });

    it("updateCoordinates() should update its location", () => {
      shape
        .setMoveOffset({ x: 50, y: 50 })
        .updateStartPoint({ x: 60, y: 60 })
        .updateCoordinates();
      shape.getAreaCoords().should.deep.equal({ x: 60, y: 60, w: 50, h: 50 });
    });
  });

  describe("Polygon Tests", () => {
    let area, shape;

    before(() => {
      area = new MapArea(
        "polygon",
        "457,120,413,193,501,193",
        "https://www.google.com"
      );
      shape = area.toShape();
    });

    it("factory should return a rectangle", () => {
      shape.type.should.equal("polygon");
      shape.should.be.an.instanceof(Polygon);
    });

    it("should not be in use", () => {
      shape.inUse().should.be.false;
    });

    it("its coords should equal [{ x: 457, y: 120 }, { x:413, y: 193 }, { x: 501, y: 193 }]", () => {
      shape
        .getAreaCoords()
        .should.deep.equal([
          { x: 457, y: 120 },
          { x: 413, y: 193 },
          { x: 501, y: 193 }
        ]);
    });

    it("should have 3 vertices", () => {
      shape.dimensions.shape.length.should.equal(3);
    });

    it("its area should equal 3,212 pixels", () => {
      shape.getArea().should.equal(3212);
    });

    it("toMapArea() should generate valid area element", () => {
      shape.toMapArea().should.deep.equal(area);
    });

    it("updateCoordinates() should update its location", () => {
      shape
        .setMoveOffset({ x: 50, y: 50 })
        .updateStartPoint({ x: 60, y: 60 })
        .updateCoordinates();
      shape
        .getAreaCoords()
        .should.deep.equal([
          { x: 467, y: 130 },
          { x: 423, y: 203 },
          { x: 511, y: 203 }
        ]);
    });
  });
});
