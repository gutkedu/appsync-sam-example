import { Context, DynamoDBPutItemRequest, util } from '@aws-appsync/utils';
import { Story, StoryInput } from '@gql/types/gql-types';

export function request(ctx: Context): DynamoDBPutItemRequest {
    const { content, title } = ctx.arguments.input as StoryInput;

    const isValidTitle = util.matches('^[a-zA-Z0-9]+$', title);
    if (!isValidTitle) {
        util.error('Invalid title, must be alphanumeric');
    }

    return {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({
            pk: `STORY`,
            sk: `STORY#${util.autoKsuid()}`,
        }),
        condition: {
            expression: 'attribute_not_exists(#sk)',
            expressionNames: {
                '#sk': 'sk',
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
    if (ctx.error) {
        return util.error(ctx.error.message);
    }

    return {
        id: ctx.result.sk.split('#')[1],
        content: ctx.result.content,
        title: ctx.result.title,
        createdAt: ctx.result.createdAt,
    };
}
