import { requireIntInRange } from '../helpers/numberTypeCheck';
import Entity from './entity';
import { NUMBER_OF_Z_LAYERS } from './gameConstants';
import { Field, Space } from './gameTypes';

export class Grid {

  static #DEFAULT_WIDTH = 16;
  static #DEFAULT_HEIGHT = 10;
  
  static get DEFAULT_WIDTH() { return Grid.#DEFAULT_WIDTH }
  static get DEFAULT_HEIGHT() { return Grid.#DEFAULT_HEIGHT }
  static getEmptyField : () => Field = () => [{air: null}, {floor: null, surface: null, air: null}, {floor: null, surface: null, air: null}];

  #width = Grid.DEFAULT_WIDTH;
  #height =  Grid.DEFAULT_HEIGHT;
  #entities: Entity[] = [];

  get width() { return this.#width }
  get height() { return this.#height }

  constructor(width = 16, height = 10) {
    this.#width = requireIntInRange(width, 'width', 1, Infinity);
    this.#height = requireIntInRange(height, 'height', 1, Infinity);
  }

  getEntityAt(x: number, y: number, z: number, space: Space) {
    requireIntInRange(x, 'x', 0, this.#width - 1);
    requireIntInRange(y, 'y', 0, this.#height - 1);
    requireIntInRange(z, 'z', 0, NUMBER_OF_Z_LAYERS - 1);
    if (z === 0 && space !== 'air') {
      throw new Error(`space ${space} does not exist in z-Layer 0`);
    }

    const entitiesOnField = this.#entities.filter(
      // @ts-expect-error - .includes works just fine even though space could be 'floor' or 'surface' here while occupiesSpaces[0] can't
      entity => entity.x === x && entity.y === y && entity.occupiesSpaces[z]?.includes(space)
    );

    return entitiesOnField[0] ?? null;
  }

  getEntitiesAt(x: number, y: number) {
    requireIntInRange(x, 'x', 0, this.#width - 1);
    requireIntInRange(y, 'y', 0, this.#height - 1);
    const field = [
      {air: this.getEntityAt(x, y, 0, 'air')},
      {floor: this.getEntityAt(x, y, 1, 'floor') , surface: this.getEntityAt(x, y, 1, 'surface'), air: this.getEntityAt(x, y, 1, 'air')},
      {floor: this.getEntityAt(x, y, 2, 'floor') , surface: this.getEntityAt(x, y, 2, 'surface'), air: this.getEntityAt(x, y, 2, 'air')}
    ] as Field;

    return field;
  }

  placeEntity(entity: Entity) {
    if (entity.grid !== this) {
      throw new Error('entity.grid does not match this grid');
    }
    entity.occupiesSpaces.forEach((spacesInZLayer, z) => {
      for (const space of spacesInZLayer) {
        if (this.getEntityAt(entity.x, entity.y, z, space) !== null) {
          throw new Error(`space ${space} in z-Layer ${z} is already occupied`);
        }
      }
    });

    this.#entities.push(entity);
  }
}