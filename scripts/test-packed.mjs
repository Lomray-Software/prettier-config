import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const directory = await mkdtemp(join(tmpdir(), 'lomray-prettier-consumer-'));
const prettier = JSON.parse(await readFile('node_modules/prettier/package.json', 'utf8'));

try {
    execFileSync('npm', ['pack', '--ignore-scripts', '--pack-destination', directory], {
        stdio: 'ignore',
        env: { ...process.env, HUSKY: '0' },
    });
    const archives = (await readdir(directory)).filter((file) => file.endsWith('.tgz'));

    assert.equal(archives.length, 1);
    await writeFile(
        join(directory, 'package.json'),
        JSON.stringify({
            private: true,
            type: 'module',
            prettier: '@lomray/prettier-config',
            devDependencies: {
                '@lomray/prettier-config': `file:./${archives[0]}`,
                prettier: prettier.version,
            },
        }),
    );
    execFileSync('npm', ['install', '--ignore-scripts', '--no-fund'], {
        cwd: directory,
        stdio: 'inherit',
    });
    execFileSync('npm', ['ls', '--all'], { cwd: directory, stdio: 'ignore' });
    await writeFile(join(directory, 'example.ts'), 'const value={name:"Lomray"};');
    execFileSync(
        process.execPath,
        [join(directory, 'node_modules/prettier/bin/prettier.cjs'), '--write', 'example.ts'],
        { cwd: directory, stdio: 'inherit' },
    );
    assert.equal(
        await readFile(join(directory, 'example.ts'), 'utf8'),
        "const value = { name: 'Lomray' };\n",
    );
    console.info('Packed Prettier config: clean installation and config discovery passed.');
} finally {
    await rm(directory, { recursive: true, force: true });
}
