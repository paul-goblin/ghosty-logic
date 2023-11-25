import { describe, it, expect } from 'vitest';
import { Grid } from '../../src/ghosty/grid';

describe('Grid', () => {
  it('should have the default height and width numbers', () => {
    const grid = new Grid();
    expect(grid.height).toBe(Grid.DEFAULT_HEIGHT);
    expect(grid.width).toBe(Grid.DEFAULT_WIDTH);
  });
  it('should throw an error iff not initialized with positive integers', () => {
    expect(() => new Grid(0, 1)).toThrow();
    expect(() => new Grid(1, 0)).toThrow();
    expect(() => new Grid(-1, -1)).toThrow();
    expect(() => new Grid(1.5, 10)).toThrow();
    expect(() => new Grid(10, 1.5)).toThrow();
    expect(() => new Grid(10, Infinity)).toThrow();
    expect(() => new Grid(NaN, 10)).toThrow();
    expect(() => new Grid(1, 1)).not.toThrow();
  });
  it('should have initialized height and width properties', () => {
    const grid = new Grid(3, 4);
    expect(grid.width).toBe(3);
    expect(grid.height).toBe(4);
  });
  it('should not be possible to change (default) height and width properties directly', () => {
    const grid = new Grid(3, 4);
    // @ts-expect-error - testing that this is not possible
    expect(() => grid.height = 10).toThrow();
    // @ts-expect-error - testing that this is not possible
    expect(() => grid.width = 10).toThrow();
    // @ts-expect-error - testing that this is not possible
    expect(() => Grid.DEFAULT_HEIGHT = 12).toThrow();
    // @ts-expect-error - testing that this is not possible
    expect(() => Grid.DEFAULT_WIDTH = 12).toThrow();
  });
});