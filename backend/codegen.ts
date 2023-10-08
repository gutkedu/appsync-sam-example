import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './src/graphql/schema/*.graphql',
    generates: {
        './src/graphql/types': {
            preset: 'graphql-modules',
            presetConfig: {
                baseTypesPath: 'graphql.d.ts',
            },
            plugins: ['typescript'],
        },
    },
};
export default config;
