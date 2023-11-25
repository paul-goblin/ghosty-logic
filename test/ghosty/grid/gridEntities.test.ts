import { describe, it, expect, beforeEach } from 'vitest';
import { Grid } from '../../../src/ghosty/grid';
import Entity from '../../../src/ghosty/entity';

describe('grid.getEntityAt(x,y,z,space)', () => {

  let grid: Grid;

  beforeEach(() => {
    grid = new Grid(4, 3);
  });

  it('should throw an error if called with x or y coordinates outside the grid', () => {
    expect(() => grid.getEntityAt(-1, 0, 0, 'air')).toThrow();
    expect(() => grid.getEntityAt(0, -1, 0, 'air')).toThrow();
    expect(() => grid.getEntityAt(4, 0, 0, 'air')).toThrow();
    expect(() => grid.getEntityAt(0, 3, 0, 'air')).toThrow();
    expect(() => grid.getEntityAt(0.5, 0, 0, 'air')).toThrow();
    expect(() => grid.getEntityAt(0, 0.5, 0, 'air')).toThrow();
    expect(() => grid.getEntityAt(0, Infinity, 0, 'air')).toThrow();
    expect(() => grid.getEntityAt(NaN, 0, 0, 'air')).toThrow();
  });

  it('should throw an error if called with z outside the grid', () => {
    expect(() => grid.getEntityAt(0, 0, -1, 'air')).toThrow();
    expect(() => grid.getEntityAt(0, 0, 3, 'air')).toThrow();
    expect(() => grid.getEntityAt(0, 0, 0.5, 'air')).toThrow();
    expect(() => grid.getEntityAt(0, 0, Infinity, 'air')).toThrow();
    expect(() => grid.getEntityAt(0, 0, NaN, 'air')).toThrow();
  });

  it('should throw an error if called with an unvalid Space in 0-Layer', () => {
    expect(() => grid.getEntityAt(0, 0, 0, 'floor')).toThrow();
    expect(() => grid.getEntityAt(0, 0, 0, 'surface')).toThrow();
  });

  it('should return null if no Entity on field', () => {
    const entityOnField = grid.getEntityAt(0, 0, 0, 'air');
    expect(entityOnField).toBeNull();
  });

  it('should return the Entity on the field', () => {
    const entity = new Entity({grid, x: 0, y: 0});
    grid.placeEntity(entity);
    expect(grid.getEntityAt(0, 0, 0, 'air')).toBe(entity);
    expect(grid.getEntityAt(0, 0, 1, 'floor')).toBe(null);
    expect(grid.getEntityAt(0, 0, 1, 'surface')).toBe(null);
    expect(grid.getEntityAt(0, 0, 1, 'air')).toBe(null);
    expect(grid.getEntityAt(0, 0, 2, 'floor')).toBe(null);
    expect(grid.getEntityAt(0, 0, 2, 'surface')).toBe(null);
    expect(grid.getEntityAt(0, 0, 2, 'air')).toBe(null);

    const entity2 = new Entity({grid, x: 0, y: 1, z: 1, zRelativeOccupiedSpaces: {'-1': ['air'],  '0': ['floor', 'surface', 'air'], '1': ['floor']}});
    grid.placeEntity(entity2);
    expect(grid.getEntityAt(0, 1, 0, 'air')).toBe(entity2);
    expect(grid.getEntityAt(0, 1, 1, 'floor')).toBe(entity2);
    expect(grid.getEntityAt(0, 1, 1, 'surface')).toBe(entity2);
    expect(grid.getEntityAt(0, 1, 1, 'air')).toBe(entity2);
    expect(grid.getEntityAt(0, 1, 2, 'floor')).toBe(entity2);
    expect(grid.getEntityAt(0, 1, 2, 'surface')).toBe(null);
    expect(grid.getEntityAt(0, 1, 2, 'air')).toBe(null);
  });

});

describe('grid.getEntitiesAt(x,y)', () => {

  let grid: Grid;

  beforeEach(() => {
    grid = new Grid(4, 3);
  });

  it('should throw an error if called with x or y coordinates outside the grid', () => {
    expect(() => grid.getEntitiesAt(-1, 0)).toThrow();
    expect(() => grid.getEntitiesAt(0, -1)).toThrow();
    expect(() => grid.getEntitiesAt(4, 0)).toThrow();
    expect(() => grid.getEntitiesAt(0, 3)).toThrow();
    expect(() => grid.getEntitiesAt(0.5, 0)).toThrow();
    expect(() => grid.getEntitiesAt(0, 0.5)).toThrow();
    expect(() => grid.getEntitiesAt(0, Infinity)).toThrow();
    expect(() => grid.getEntitiesAt(NaN, 0)).toThrow();
  });

  it('should return the Empty Field if no Entity on field', () => {
    const entitiesOnField = grid.getEntitiesAt(0, 0);
    expect(entitiesOnField).toEqual(Grid.getEmptyField());
  });

  it('should return the Field with the Entity on it', () => {
    const entity = new Entity({grid, x: 0, y: 0});
    grid.placeEntity(entity);
    const entitiesOnField = grid.getEntitiesAt(0, 0);
    const FieldWithEntity = Grid.getEmptyField();
    FieldWithEntity[0].air = entity;
    expect(entitiesOnField).toEqual(FieldWithEntity);
  });

});

describe('grid.placeEntity(entity)', () => {
  
  let grid: Grid;
  
  beforeEach(() => {
    grid = new Grid(4, 3);
  });
  
  it('should throw an error if called with an entity not on the grid', () => {
    const entity = new Entity({grid: new Grid(4, 3), x: 0, y: 0});
    expect(() => grid.placeEntity(entity)).toThrow();
  });

  it('should throw an error if there already is an entity on the field occupying the same space', () => {
    const entity1 = new Entity({grid, x: 0, y: 0});
    const entity2 = new Entity({grid, x: 0, y: 0});
    grid.placeEntity(entity1);
    expect(() => grid.placeEntity(entity2)).toThrow();
  });

});