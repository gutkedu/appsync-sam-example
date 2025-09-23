// src/graphql/modules/events/publish-story-created.resolver.ts
import { util } from '@aws-appsync/utils';
function request(ctx) {
    const { result } = ctx.prev;
    if (!result) {
        return util.error('No story created to publish event for');
    }
    return {
        operation: 'Invoke',
        payload: {
            eventType: 'STORY_CREATED',
            channel: 'default/stories',
            data: result,
        },
    };
}
function response(ctx) {
    if (ctx.error) {
        console.error('Failed to publish story created event:', ctx.error);
    }
    return ctx.prev.result;
}
export { request, response };
