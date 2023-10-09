// src/graphql/resolvers/get-story.resolver.ts
import { util } from '@aws-appsync/utils';
function request(ctx) {
    const id = ctx.arguments.id;
    return {
        operation: 'GetItem',
        key: util.dynamodb.toMapValues({
            pk: id,
        }),
    };
}
function response(ctx) {
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
export { request, response };
