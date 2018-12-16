interface Renderable {
  render(model: Model): void;
}

function render(model : Model) : void {
  model.ctx.clearRect(0, 0, model.canvas.width, model.canvas.height);
  level.map(row => row.map(tile => tile.render(model)));
  renderPlayer(model);
}
