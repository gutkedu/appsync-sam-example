// src/graphql/modules/location/get-ip-location.resolver.ts
import { util } from '@aws-appsync/utils';
function request(ctx) {
    const { ip } = ctx.args.input;
    return {
        method: 'GET',
        resourcePath: '/',
        params: {
            query: {
                ip,
            },
        },
    };
}
function response(ctx) {
    if (ctx.error) {
        util.error(ctx.error.message);
    }
    const parsedBody = JSON.parse(ctx.result.body);
    return parsedBody;
}
export { request, response };
