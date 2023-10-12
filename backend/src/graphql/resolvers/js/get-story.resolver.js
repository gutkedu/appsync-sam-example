// src/graphql/resolvers/get-story.resolver.ts
import { util } from '@aws-appsync/utils';
function request(ctx) {
    const id = ctx.arguments.id;
    const PatternUUIDRegex = '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$';
    const isValidId = util.matches(PatternUUIDRegex, id);
    if (!isValidId) {
        util.error('Invalid id');
    }
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
        id: ctx.result.pk,
        content: ctx.result.content,
        title: ctx.result.title,
        createdAt: ctx.result.createdAt,
    };
}
export { request, response };
