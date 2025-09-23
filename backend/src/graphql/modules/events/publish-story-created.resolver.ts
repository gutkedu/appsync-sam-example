import { Context, util } from '@aws-appsync/utils';

export function request(ctx: Context) {
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

export function response(ctx: Context) {
    if (ctx.error) {
        console.error('Failed to publish story created event:', ctx.error);
        // Don't fail the mutation if event publishing fails
    }
    // Return the original story creation result
    return ctx.prev.result;
}
