import { Context, DynamoDBGetItemRequest, util } from '@aws-appsync/utils';
import { isValidKSUID } from '@gql/shared/is-valid-ksuid';
import { StoryWithComments } from '@gql/types/gql-types';

export function request(ctx: Context): DynamoDBGetItemRequest {
    const id = ctx.arguments.storyId as string;

    if (!isValidKSUID(id)) {
        util.error('Invalid id');
    }

    return {
        operation: 'GetItem',
        key: util.dynamodb.toMapValues({
            pk: `STORY`,
            sk: `STORY#${id}`,
        }),
    };
}

export function response(ctx: Context): StoryWithComments {
    if (ctx.error) {
        return util.error(ctx.result.error);
    }

    if (!ctx.result) {
        util.error('Story not found');
    }

    return {
        story: {
            id: ctx.result.sk.split('#')[1],
            content: ctx.result.content,
            title: ctx.result.title,
            createdAt: ctx.result.createdAt,
        },
        comments: undefined,
    };
}
