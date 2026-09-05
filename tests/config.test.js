import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import * as prettier from 'prettier';
import config from '../index.js';

describe('Lomray formatting', () => {
    it('keeps single quotes, semicolons and trailing commas', async () => {
        const result = await prettier.format('const value={first:"one",second:[1,2]};', {
            ...config,
            parser: 'typescript',
        });

        assert.equal(result, "const value = { first: 'one', second: [1, 2] };\n");
    });

    it('keeps JSX closing brackets on their own line', async () => {
        const result = await prettier.format(
            '<Card first="some sufficiently long property value" second="another sufficiently long property value" />',
            { ...config, parser: 'babel' },
        );

        assert.match(result, /\n\/>;\n$/);
        assert.equal(await prettier.check(result, { ...config, parser: 'babel' }), true);
    });

    it('supports consumer overrides', async () => {
        const result = await prettier.format('const value = "hello";', {
            ...config,
            semi: false,
            parser: 'babel',
        });

        assert.equal(result, "const value = 'hello'\n");
    });
});
