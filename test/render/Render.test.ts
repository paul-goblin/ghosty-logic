
import { Application } from 'pixi.js';
import { describe, it } from 'vitest';

describe('Pixi App', function() {
  it('should work!', async function() {
    const app = new Application();
    await app.init();
  });
});