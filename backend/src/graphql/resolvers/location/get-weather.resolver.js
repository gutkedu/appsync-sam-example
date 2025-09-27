// src/graphql/modules/location/get-weather.resolver.ts
import { util } from '@aws-appsync/utils';
function request(ctx) {
    const ipInfo = ctx.prev.result;
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
            },
        },
    };
}
function response(ctx) {
    if (ctx.error) {
        util.error(ctx.error.message);
    }
    const parsedBody = JSON.parse(ctx.result.body);
    return {
        ipInfo: ctx.prev.result.ipInfo,
        weather: parsedBody,
        sendEvent: ctx.prev.result.sendEvent || false,
    };
}
export { request, response };
