import { Context, LambdaRequest, util } from '@aws-appsync/utils';

export function request(): LambdaRequest {
    return {
        operation: 'Invoke',
        payload: null,
    };
}

export function response(ctx: Context): string {
    if (!ctx.result) {
        util.error('Story not found');
    }
    return ctx.result;
}
