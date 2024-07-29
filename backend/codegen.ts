import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './src/graphql/schema.graphql',
    generates: {
        './src/graphql/types': {
            preset: 'graphql-modules',
            presetConfig: {
                baseTypesPath: 'gql-types.d.ts',
            },
            plugins: ['typescript'],
        },
    },
};
export default config;
