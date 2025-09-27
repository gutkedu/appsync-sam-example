// src/graphql/modules/events/publish-location-searched.resolver.ts
import { runtime } from '@aws-appsync/utils';
function request(ctx) {
    const previousResult = ctx.prev.result;
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
function response(ctx) {
    if (ctx.error) {
        console.error('Failed to publish location searched event:', ctx.error);
    }
    return ctx.prev.result;
}
export { request, response };
