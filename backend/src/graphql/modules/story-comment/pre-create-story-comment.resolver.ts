import { Context, DynamoDBGetItemRequest, util } from '@aws-appsync/utils';
import { isValidKSUID } from '@gql/shared/is-valid-ksuid';
import { StoryCommentInput } from '@gql/types/gql-types';

export function request(ctx: Context): DynamoDBGetItemRequest {
    const { storyId } = ctx.arguments.input as StoryCommentInput;

    if (!isValidKSUID(storyId)) {
        util.error('Invalid storyId');
    }

    return {
        operation: 'GetItem',
        key: util.dynamodb.toMapValues({
            pk: `STORY`,
            sk: `STORY#${storyId}`,
        }),
    };
}

export function response(ctx: Context): StoryCommentInput {
    if (ctx.error) {
        util.error(ctx.error.message);
    }

    if (!ctx.result) {
        util.error('Story not found');
    }

    return {
        storyId: ctx.arguments.input.storyId,
        comment: ctx.arguments.input.comment,
    };
}
