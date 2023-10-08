import { Context, DynamoDBPutItemRequest, util } from '@aws-appsync/utils';
import { Story, StoryInput } from '../types/graphql';

export function request(ctx: Context): DynamoDBPutItemRequest {
    const { content, title } = ctx.arguments.input as StoryInput;

    const isValidTitle = util.matches('^[a-zA-Z0-9]+$', title);
    if (!isValidTitle) {
        util.error('Invalid title');
    }

    return {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({
            id: util.autoId(),
        }),
        condition: {
            expression: 'attribute_not_exists(#id)',
            expressionNames: {
                '#id': 'id',
            },
        },
        attributeValues: util.dynamodb.toMapValues({
            content,
            title,
            createdAt: util.time.nowISO8601(),
        }),
    };
}

export function response(ctx: Context): Story {
    return {
        id: ctx.result.id,
        content: ctx.result.content,
        title: ctx.result.title,
        createdAt: ctx.result.publishedAt,
    };
}
