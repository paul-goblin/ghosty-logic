import { occupiesSpaces } from './gameTypes'

export const SPACES = ['floor', 'surface', 'air'] as const

export const EXISTING_SPACES_PER_Z_LAYER = [['air'], ['floor', 'surface', 'air'], ['floor', 'surface', 'air']] as occupiesSpaces
export const NUMBER_OF_Z_LAYERS = EXISTING_SPACES_PER_Z_LAYER.length
export const Z_POSSIBLE_OFFSETS = ['-2', '-1', '0', '1', '2'] as const