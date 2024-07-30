// src/graphql/modules/url/get-url-http-datasource.resolver.ts
import { util } from '@aws-appsync/utils';
function request() {
    return {
        method: 'GET',
        resourcePath: '/random.json',
        params: {},
    };
}
function response(ctx) {
    if (ctx.error) {
        util.error(ctx.error.message);
    }
    const parsedBody = JSON.parse(ctx.result.body);
    const { file } = parsedBody;
    if (!file) {
        util.error('Coffee image not found');
    }
    return file;
}
export { request, response };
