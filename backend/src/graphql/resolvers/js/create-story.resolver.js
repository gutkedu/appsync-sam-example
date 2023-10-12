// src/graphql/resolvers/create-story.resolver.ts
import { util } from '@aws-appsync/utils';
function request(ctx) {
    const { content, title } = ctx.arguments.input;
    const isValidTitle = util.matches('^[a-zA-Z0-9]+$', title);
    if (!isValidTitle) {
        util.error('Invalid title');
    }
    return {
        operation: 'PutItem',
        key: util.dynamodb.toMapValues({
            pk: util.autoId(),
        }),
        condition: {
            expression: 'attribute_not_exists(#pk)',
            expressionNames: {
                '#pk': 'pk',
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
    return {
        id: ctx.result.pk,
        content: ctx.result.content,
        title: ctx.result.title,
        createdAt: ctx.result.createdAt,
    };
}
export { request, response };
