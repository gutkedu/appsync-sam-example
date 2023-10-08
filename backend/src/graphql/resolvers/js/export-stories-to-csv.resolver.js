// src/graphql/resolvers/export-stories-to-csv.resolver.ts
import { util } from '@aws-appsync/utils';
function request() {
    return {
        operation: 'Invoke',
        payload: null,
    };
}
function response(ctx) {
    if (!ctx.result) {
        util.error('Story not found');
    }
    return ctx.result;
}
export { request, response };
