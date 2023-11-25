import { requireIntInRange } from '../helpers/numberTypeCheck';
import { NUMBER_OF_Z_LAYERS } from './gameConstants';
import { occupiesSpaces, zRelativeOccupiedSpaces } from './gameTypes';
import { Grid } from './grid';

export class Entity {

  static DEFAULT_Z = 0 as const;
  static DEFAULT_Z_RELATIVE_OCCUPIED_SPACES: zRelativeOccupiedSpaces = {'0': ['air']};

  #grid: Grid;
  #x: number;
  #y: number;
  #z: 0|1|2 = Entity.DEFAULT_Z;
  #zRelativeOccupiedSpaces: zRelativeOccupiedSpaces = Entity.DEFAULT_Z_RELATIVE_OCCUPIED_SPACES;
  #occupiesSpaces: occupiesSpaces = [[],[],[]];

  get grid() { return this.#grid }
  get x() { return this.#x }
  get y() { return this.#y }
  get z() { return this.#z }
  get zRelativeOccupiedSpaces() { return this.#zRelativeOccupiedSpaces }
  get occupiesSpaces() { return this.#occupiesSpaces }

  constructor({grid, x, y, z, zRelativeOccupiedSpaces}: {grid: Grid, x: number, y: number, z?: number, zRelativeOccupiedSpaces?: zRelativeOccupiedSpaces}) {
    this.#grid = grid;
    this.#x = requireIntInRange(x, 'x', 0, grid.width - 1);
    this.#y = requireIntInRange(y, 'y', 0, grid.height - 1);
    if (z !== undefined) {
      this.#z = requireIntInRange(z, 'z', 0, NUMBER_OF_Z_LAYERS - 1) as 0|1|2;
    }
    if (zRelativeOccupiedSpaces !== undefined) {
      this.#zRelativeOccupiedSpaces = zRelativeOccupiedSpaces;
    }
    this._updateOccupiedSpaces();
  }

  private _updateOccupiedSpaces() {
    this.#occupiesSpaces[0] = this.#zRelativeOccupiedSpaces[-this.#z as -2|-1|0]?.includes('air') ? ['air'] : [];
    this.#occupiesSpaces[1] = this.#zRelativeOccupiedSpaces[1-this.#z as -1|0|1] ?? [];
    this.#occupiesSpaces[2] = this.#zRelativeOccupiedSpaces[2-this.#z as 0|1|2] ?? [];
  }
}

export default Entity;
