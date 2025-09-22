// src/graphql/modules/story-comment/fetch-story-comments.resolver.ts
function request(ctx) {
    const { story } = ctx.prev.result;
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
function response(ctx) {
    if (ctx.error) {
        return util.error(ctx.error.message);
    }
    return {
        story: ctx.prev.result.story,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        comments: ctx.result.items.map((item) => ({
            id: item.sk.split('#')[1],
            comment: item.comment,
            createdAt: item.createdAt,
            storyId: item.pk.split('#')[1],
        })),
    };
}
export { request, response };
