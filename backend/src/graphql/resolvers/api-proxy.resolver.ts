import { Context, LambdaRequest, util } from '@aws-appsync/utils';
import { ApiProxyResponse } from '../../lambdas/api-proxy';

export function request(): LambdaRequest {
    return {
        operation: 'Invoke',
        payload: null,
    };
}

export function response(ctx: Context): string {
    const { url } = ctx.result as ApiProxyResponse;

    if (!url) {
        util.error('Coffee image not found');
    }

    return url;
}
