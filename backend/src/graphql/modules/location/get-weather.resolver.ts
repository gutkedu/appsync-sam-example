import { Context, HTTPRequest, util } from '@aws-appsync/utils';
import { IpInfo, IpWeatherInfo, WeatherInfo } from '@gql/types/gql-types';

interface WeatherQueryParams {
    latitude: number;
    longitude: number;
    current: string;
}

export function request(ctx: Context): HTTPRequest<string> {
    const ipInfo = ctx.prev.result as IpWeatherInfo;

    const latitude = ipInfo.ipInfo?.latitude;
    const longitude = ipInfo.ipInfo?.longitude;

    if (!latitude || !longitude) {
        util.error('Latitude or Longitude not found');
    }

    return {
        method: 'GET',
        resourcePath: '/v1/forecast',
        params: {
            query: {
                latitude,
                longitude,
                current: 'temperature_2m,wind_speed_10m',
            } as WeatherQueryParams,
        },
    };
}

export function response(ctx: Context): IpWeatherInfo {
    if (ctx.error) {
        util.error(ctx.error.message);
    }

    const parsedBody = JSON.parse(ctx.result.body) as WeatherInfo;

    return {
        ipInfo: ctx.prev.result.ipInfo as IpInfo,
        weather: parsedBody,
        sendEvent: ctx.prev.result.sendEvent || false,
    };
}
