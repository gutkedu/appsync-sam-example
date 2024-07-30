// src/graphql/modules/story/create-story.resolver.ts
import { util } from '@aws-appsync/utils';
function request(ctx) {
    const { content, title } = ctx.arguments.input;
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
function response(ctx) {
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
export { request, response };
