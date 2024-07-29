import { Context, DynamoDBQueryRequest } from '@aws-appsync/utils';
import { FetchStoriesInput, FetchStories } from '@gql/types/gql-types';

export function request(ctx: Context): DynamoDBQueryRequest {
    const { limit, token } = ctx.arguments.input as FetchStoriesInput;

    return {
        operation: 'Query',
        query: {
            expression: '#pk = :pk',
            expressionNames: {
                '#pk': 'pk',
            },
            expressionValues: {
                ':pk': util.dynamodb.toDynamoDB('STORY'),
            },
        },
        limit: limit || 100,
        nextToken: token || undefined,
        scanIndexForward: false,
    };
}

export function response(ctx: Context): FetchStories {
    if (ctx.error) {
        return util.error(ctx.result.error);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const stories = ctx.result.items.map((item: any) => ({
        id: item.sk.split('#')[1],
        title: item.title,
        content: item.content,
        createdAt: item.createdAt,
    }));

    return {
        stories,
        nextToken: ctx.result.nextToken || undefined,
    };
}
