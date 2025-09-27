import { Context, HTTPRequest, util } from '@aws-appsync/utils';
import { IpInput, IpInfo, IpWeatherInfo } from '../../types/gql-types';

interface QueryParams {
    ip: string;
}

export function request(ctx: Context): HTTPRequest<string> {
    const { ip } = ctx.args.input as IpInput;

    return {
        method: 'GET',
        resourcePath: '/',
        params: {
            query: {
                ip,
            } as QueryParams,
        },
    };
}

export function response(ctx: Context): IpWeatherInfo {
    if (ctx.error) {
        util.error(ctx.error.message);
    }

    const parsedBody = JSON.parse(ctx.result.body) as IpInfo;

    return {
        ipInfo: parsedBody,
        weather: {},
        sendEvent: ctx.args.input.sendEvent || false,
    };
}
