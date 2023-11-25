import Entity from './entity';
import { SPACES } from './gameConstants';

export type Space = typeof SPACES[number];
export type occupiesSpaces = [ReadonlyArray<'air'>, ReadonlyArray<Space>, ReadonlyArray<Space>];
export type zRelativeOccupiedSpaces = Readonly<{
  '-2'?: Readonly<Space[]>,
  '-1'?: Readonly<Space[]>,
  '0': Readonly<Space[]>,
  '1'?: Readonly<Space[]>,
  '2'?: Readonly<Space[]>,
}>;
export type Field = [
  backgroundLayer: {air: Entity|null},
  groundLayer: {floor: Entity|null, surface: Entity|null, air: Entity|null},
  topLayer: {floor: Entity|null, surface: Entity|null, air: Entity|null}
];