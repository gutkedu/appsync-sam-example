import { Context, DynamoDBQueryRequest } from '@aws-appsync/utils';
import { StoryWithComments } from '@gql/types/gql-types';

// This function is expected to be called after the get story resolver
export function request(ctx: Context): DynamoDBQueryRequest {
    const { story } = ctx.prev.result as StoryWithComments;

    return {
        operation: 'Query',
        query: {
            expression: '#pk = :pk',
            expressionNames: {
                '#pk': 'pk',
            },
            expressionValues: {
                ':pk': util.dynamodb.toDynamoDB(`STORY#${story.id}`),
            },
        },
        scanIndexForward: false,
    };
}

export function response(ctx: Context): StoryWithComments {
    if (ctx.error) {
        return util.error(ctx.error.message);
    }

    return {
        story: ctx.prev.result.story,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        comments: ctx.result.items.map((item: any) => ({
            id: item.sk.split('#')[1],
            comment: item.comment,
            createdAt: item.createdAt,
            storyId: item.storyId,
        })),
    };
}
