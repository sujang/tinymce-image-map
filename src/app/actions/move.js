const move = {
  onMouseDown(scope, coords) {
    scope.focusedShape
      .select()
      .drag()
      .setMoveOffset(coords);
  },
  onMouseMove(scope, coords) {
    scope.focusedShape.updateStartPoint(coords).updateCoordinates();
  },
  onMouseUp(scope) {
    scope.focusedShape.drop();
  }
};

export default move;
