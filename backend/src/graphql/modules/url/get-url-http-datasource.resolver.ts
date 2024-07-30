import { Context, HTTPRequest, util } from '@aws-appsync/utils';

interface CoffeeApiResponse {
    file: string;
}

export function request(): HTTPRequest<string> {
    return {
        method: 'GET',
        resourcePath: '/random.json',
        params: {},
    };
}

export function response(ctx: Context): string {
    if (ctx.error) {
        util.error(ctx.error.message);
    }

    const parsedBody = JSON.parse(ctx.result.body) as CoffeeApiResponse;
    const { file } = parsedBody;

    if (!file) {
        util.error('Coffee image not found');
    }

    return file;
}
