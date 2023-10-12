// src/graphql/resolvers/api-proxy.resolver.ts
import { util } from '@aws-appsync/utils';
function request() {
    return {
        operation: 'Invoke',
        payload: null,
    };
}
function response(ctx) {
    const { url } = ctx.result;
    if (!url) {
        util.error('Coffee image not found');
    }
    return url;
}
export { request, response };
