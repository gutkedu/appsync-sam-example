import { Context, DynamoDBPutItemRequest, util } from '@aws-appsync/utils';
import { isValidKSUID } from '@gql/shared/is-valid-ksuid';
import { StoryComment, StoryCommentInput } from '@gql/types/gql-types';

export function request(ctx: Context): DynamoDBPutItemRequest {
    const { comment, storyId } = ctx.prev.result as StoryCommentInput;

    if (!isValidKSUID(storyId)) {
        util.error('Invalid storyId');
    }

    return {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({
            pk: `STORY#${storyId}`,
            sk: `COMMENT#${util.autoKsuid()}`,
        }),
        condition: {
            expression: 'attribute_not_exists(#sk)',
            expressionNames: {
                '#sk': 'sk',
            },
        },
        attributeValues: util.dynamodb.toMapValues({
            comment,
            createdAt: util.time.nowISO8601(),
        }),
    };
}

export function response(ctx: Context): StoryComment {
    if (ctx.error) {
        util.error(ctx.error.message);
    }

    const { pk, sk, comment, createdAt } = ctx.result;

    return {
        id: sk.split('#')[1],
        storyId: pk.split('#')[1],
        comment,
        createdAt,
    };
}
