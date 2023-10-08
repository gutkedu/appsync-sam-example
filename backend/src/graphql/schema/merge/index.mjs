import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { print } from 'graphql';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const graphqlTypedefsArray = loadFilesSync(path.join(__dirname, '../'), { extensions: ['graphql'] });

const mergeSchemas = mergeTypeDefs(graphqlTypedefsArray);
const mergedSchemaString = print(mergeSchemas);

const outputPath = path.join(__dirname, '../', '../', 'schema.graphql');

fs.writeFileSync(outputPath, mergedSchemaString);

console.log('Schema merge complete');
