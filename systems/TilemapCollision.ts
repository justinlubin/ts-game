class TilemapCollision implements FixedSystem {
  readonly requirements =
    new Set<Component>([Component.BOUNDING_BOX, Component.PHYSICS]);

  constructor(public horizontal: boolean, public vertical: boolean) {}

  update(w: World, dt: number): void {
    w.forall(this.requirements, e => {
      const bb = w.boundingBox[e];
      const phys = w.physics[e];

      // Not grounded until bottom collision detected
      phys.grounded = false;

      // Check to see if a collision has occurred
      const collision = this.collides(w.model.tilemap, bb, phys.velocity);
      if (!collision) {
        return;
      }

      // A collision has occurred, reset position
      this.correctCollision(bb, phys);
    });
  }

  collides(tilemap: Tilemap, bb: BoundingBox, vel: Vec) {
    for (let modifier of [0.01, 0.5, 0.99]) {
      if (this.horizontal) {
        const position = new Vec(-1, bb.position.y + bb.height * modifier);
        if (vel.x < 0) {
          position.x = bb.position.x;
        } else if (vel.x > 0) {
          position.x = bb.right();
        }
        const alignedPosition = tilemap.align(position);

        if (alignedPosition != null && tilemap.blocked(alignedPosition)) {
          return true;
        }
      }

      if (this.vertical) {
        const position = new Vec(bb.position.x + bb.width * modifier, -1);
        if (vel.y < 0) {
          position.y = bb.position.y;
        } else if (vel.y > 0) {
          position.y = bb.bottom();
        }
        const alignedPosition = tilemap.align(position);

        if (alignedPosition != null && tilemap.blocked(alignedPosition)) {
          return true;
        }
      }
    }

    return false;
  }

  correctCollision(bb: BoundingBox, phys: Physics) {
    const vel = phys.velocity;

    if (this.horizontal) {
      if (vel.x < 0) {
        bb.position.x = Math.ceil(bb.position.x);
      } else if (vel.x > 0) {
        bb.position.x = Math.floor(bb.right()) - bb.width;
      }
      vel.x = 0;
    }

    if (this.vertical) {
      if (vel.y < 0) {
        bb.position.y = Math.ceil(bb.position.y);
      } else if (vel.y > 0) {
        bb.position.y = Math.floor(bb.bottom()) - bb.height;
        phys.grounded = true;
      }
      vel.y = 0;
    }
  }
}
