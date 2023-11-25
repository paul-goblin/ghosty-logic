import { describe, it, expect, beforeEach, } from 'vitest';
import { Entity } from '../../src/ghosty/entity';
import { Grid } from '../../src/ghosty/grid';
import { NUMBER_OF_Z_LAYERS, SPACES } from '../../src/ghosty/gameConstants';

describe('Entity', () => {

  let grid: Grid;
  let entity: Entity;

  beforeEach(() => {
    grid = new Grid(4,3);
    entity = new Entity({grid, x: 1, y: 1});
  });

  it('should have the default z and zRelativeOccupiedSpaces', () => {
    expect(entity.z).toBe(Entity.DEFAULT_Z);
    expect(entity.zRelativeOccupiedSpaces).toEqual(Entity.DEFAULT_Z_RELATIVE_OCCUPIED_SPACES);
  });

  it('should throw an error if not initialized with valid coordinates', () => {
    expect(() => new Entity({grid, x: 1.5, y: 1})).toThrow();
    expect(() => new Entity({grid, x: 1, y: 1.5})).toThrow();
    expect(() => new Entity({grid, x: -1, y: 1})).toThrow();
    expect(() => new Entity({grid, x: 1, y: -1})).toThrow();
    expect(() => new Entity({grid, x: 4, y: 1})).toThrow();
    expect(() => new Entity({grid, x: 1, y: 3})).toThrow();

    expect(() => new Entity({grid, x: 1, y: 1, z:NUMBER_OF_Z_LAYERS})).toThrow();
    expect(() => new Entity({grid, x: 1, y: 1, z:-1})).toThrow();
    expect(() => new Entity({grid, x: 1, y: 1, z:0.5})).toThrow();
  });

  it('should have initialized grid, x, y, z, zRelativeOccupiedSpaces, occupiesSpaces properties', () => {
    expect(entity.grid).toBe(grid);
    expect(entity.x).toBe(1);
    expect(entity.y).toBe(1);
    expect(entity.z).toBe(0);
    expect(entity.zRelativeOccupiedSpaces).toEqual({'0': ['air']});
    expect(entity.occupiesSpaces).toEqual([['air'],[],[]]);

    const zRelativeOccupiedSpaces = {'-2': SPACES, '-1': SPACES, '0': SPACES, '1': SPACES, '2': SPACES};
    const entity2 = new Entity({grid, x: 1, y: 1, z: 1, zRelativeOccupiedSpaces});
    expect(entity2.z).toBe(1);
    expect(entity2.zRelativeOccupiedSpaces).toEqual(zRelativeOccupiedSpaces);
  });

  it('should not be possible to change the properties directly', () => {
    // @ts-expect-error - testing that this is not possible
    expect(() => entity.grid = new Grid()).toThrow();
    // @ts-expect-error - testing that this is not possible
    expect(() => entity.x = 10).toThrow();
    // @ts-expect-error - testing that this is not possible
    expect(() => entity.y = 10).toThrow();
    // @ts-expect-error - testing that this is not possible
    expect(() => entity.z = 1).toThrow();
    // @ts-expect-error - testing that this is not possible
    expect(() => entity.zRelativeOccupiedSpaces = {'0': ['air']}).toThrow();
  });
});