import { Context, util } from '@aws-appsync/utils';

export function request(ctx: Context) {
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

export function response(ctx: Context) {
    if (ctx.error) {
        console.error('Failed to publish comment created event:', ctx.error);
        // Don't fail the mutation if event publishing fails
    }
    // Return the original comment creation result
    return ctx.prev.result;
}
