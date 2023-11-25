export const requireInt = (value: number, name: string) => {
  if (value % 1 !== 0) {
    throw new Error(`${name} must be an integer`);
  }
  return value;
};

export const requireInRange = (value: number, name: string, min: number, max: number) => {
  if (value >= min && value <= max) {
    return value;
  }
  throw new Error(`${name} must be between ${min} and ${max}`);
}

export const requireIntInRange = (value: number, name: string, min: number, max: number) => {
  return requireInRange(requireInt(value, name), name, min, max);
}