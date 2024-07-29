import { build } from 'esbuild';
import { Glob } from 'glob';

const glob = new Glob('src/graphql/modules/**/*.ts', { sync: true });

const files = await glob.walk();

console.log('Building files:');
console.log(files);

await build({
    format: 'esm',
    target: 'esnext',
    platform: 'node',
    external: ['@aws-appsync/utils'],
    outdir: 'src/graphql/resolvers',
    entryPoints: files,
    bundle: true,
});

console.log('Build complete');
