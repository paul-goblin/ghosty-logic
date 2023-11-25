import { describe, it, expect } from 'vitest';
import { requireInt, requireInRange, requireIntInRange } from '../../src/helpers/numberTypeCheck';

describe('requireInt(number, string)', () => {
  it('should throw an error if called with a non-integer', () => {
    expect(() => requireInt(1.5, 'Age')).toThrow();
    expect(() => requireInt(Infinity, 'Age')).toThrow();
    expect(() => requireInt(NaN, 'Age')).toThrow();
  });
  it('should return the integer if called with an integer', () => {
    expect(requireInt(1, 'Age')).toBe(1);
    expect(requireInt(0, 'Age')).toBe(0);
    expect(requireInt(-1, 'Age')).toBe(-1);
  });
});

describe('requireInRange(number, string, number, number)', () => {
  it('should throw an error if called with a number outside the range', () => {
    expect(() => requireInRange(1, 'Age', 2, 3)).toThrow();
    expect(() => requireInRange(4, 'Age', 2, 3)).toThrow();
    expect(() => requireInRange(1.5, 'Age', 2, 3)).toThrow();
    expect(() => requireInRange(Infinity, 'Age', 2, 3)).toThrow();
    expect(() => requireInRange(NaN, 'Age', 2, 3)).toThrow();
  });
  it('should return the number if called with a number inside the range', () => {
    expect(requireInRange(2, 'Age', 2, 3)).toBe(2);
    expect(requireInRange(3, 'Age', 2, 3)).toBe(3);
  });
});

describe('requireIntInRange(number, string, number, number)', () => {
  it('should throw an error if called with a non-integer', () => {
    expect(() => requireIntInRange(1.5, 'Age', 2, 3)).toThrow();
    expect(() => requireIntInRange(Infinity, 'Age', 2, 3)).toThrow();
    expect(() => requireIntInRange(NaN, 'Age', 2, 3)).toThrow();
  });
  it('should throw an error if called with a number outside the range', () => {
    expect(() => requireIntInRange(1, 'Age', 2, 3)).toThrow();
    expect(() => requireIntInRange(4, 'Age', 2, 3)).toThrow();
  });
  it('should return the number if called with an integer inside the range', () => {
    expect(requireIntInRange(2, 'Age', 2, 3)).toBe(2);
    expect(requireIntInRange(3, 'Age', 2, 3)).toBe(3);
  });
});