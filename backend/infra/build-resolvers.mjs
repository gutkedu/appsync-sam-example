/* eslint-disable */
import { build } from 'esbuild';
import eslint from 'esbuild-plugin-eslint';
import { Glob } from 'glob';

const glob = new Glob('src/appsync/*.ts', { sync: true });

const files = await glob.walk();

console.log('Building files:');
console.log(files);

await build({
    format: 'esm',
    target: 'esnext',
    platform: 'node',
    external: ['@aws-appsync/utils'],
    outdir: 'dist/',
    entryPoints: files,
    bundle: true,
    plugins: [eslint({ useEslintrc: true })],
});

console.log('Build complete');
