// src/graphql/modules/events/publish-comment-created.resolver.ts
import { util } from '@aws-appsync/utils';
function request(ctx) {
    const { result } = ctx.prev;
    if (!result) {
        return util.error('No comment created to publish event for');
    }
    return {
        operation: 'Invoke',
        payload: {
            eventType: 'STORY_COMMENT_CREATED',
            channel: `default/stories/${result.storyId}/comments`,
            data: result,
        },
    };
}
function response(ctx) {
    if (ctx.error) {
        console.error('Failed to publish comment created event:', ctx.error);
    }
    return ctx.prev.result;
}
export { request, response };
