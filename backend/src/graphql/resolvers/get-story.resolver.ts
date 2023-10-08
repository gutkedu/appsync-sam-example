import { Context, DynamoDBGetItemRequest, util } from '@aws-appsync/utils';
import { Story } from '../types/graphql';

export function request(ctx: Context): DynamoDBGetItemRequest {
    const id = ctx.arguments.id as string;

    return {
        operation: 'GetItem',
        key: util.dynamodb.toMapValues({
            id,
        }),
    };
}

export function response(ctx: Context): Story {
    if (!ctx.result) {
        util.error('Story not found');
    }

    return {
        id: ctx.result.id,
        content: ctx.result.content,
        title: ctx.result.title,
        createdAt: ctx.result.publishedAt,
    };
}
