// src/graphql/modules/story/fetch-stories.resolver.ts
function request(ctx) {
    const { limit, token } = ctx.arguments.input;
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
        nextToken: token || void 0,
        scanIndexForward: false,
    };
}
function response(ctx) {
    if (ctx.error) {
        return util.error(ctx.result.error);
    }
    const stories = ctx.result.items.map((item) => ({
        id: item.sk.split('#')[1],
        title: item.title,
        content: item.content,
        createdAt: item.createdAt,
    }));
    return {
        stories,
        nextToken: ctx.result.nextToken || void 0,
    };
}
export { request, response };
