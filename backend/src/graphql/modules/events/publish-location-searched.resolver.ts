import { Context, LambdaRequest, runtime } from '@aws-appsync/utils';
import { IpWeatherInfo } from '@gql/types/gql-types';

export function request(ctx: Context): LambdaRequest {
    const previousResult = ctx.prev.result as IpWeatherInfo;

    const { sendEvent } = previousResult;
    if (!sendEvent) {
        runtime.earlyReturn(previousResult, { skipTo: 'END' });
    }

    return {
        operation: 'Invoke',
        invocationType: 'Event',
        payload: {
            eventType: 'LOCATION_SEARCHED',
            channel: 'default/location',
            data: previousResult,
        },
    };
}

export function response(ctx: Context) {
    if (ctx.error) {
        console.error('Failed to publish location searched event:', ctx.error);
        // Don't fail the query if event publishing fails
    }
    return ctx.prev.result;
}
