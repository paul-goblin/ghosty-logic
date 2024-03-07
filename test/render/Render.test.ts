/**
 * @vitest-environment jsdom
 */

import { Application } from '@pixi/node';
import { describe, it } from 'vitest';

describe('Render', function() {
  it('should be able to create a Render instance', async function() {
    new Application();
  });
});