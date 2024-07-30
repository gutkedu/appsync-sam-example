// src/graphql/modules/story-comment/pre-create-story-comment.resolver.ts
import { util as util2 } from '@aws-appsync/utils';

// src/graphql/shared/is-valid-ksuid.ts
function isValidKSUID(id) {
    const PatternKSUIDRegex = '^[0-9a-zA-Z]{27}$';
    return util.matches(PatternKSUIDRegex, id);
}

// src/graphql/modules/story-comment/pre-create-story-comment.resolver.ts
function request(ctx) {
    const { storyId } = ctx.arguments.input;
    if (!isValidKSUID(storyId)) {
        util2.error('Invalid storyId');
    }
    return {
        operation: 'GetItem',
        key: util2.dynamodb.toMapValues({
            pk: `STORY`,
            sk: `STORY#${storyId}`,
        }),
    };
}
function response(ctx) {
    if (ctx.error) {
        util2.error(ctx.error.message);
    }
    if (!ctx.result) {
        util2.error('Story not found');
    }
    return {
        storyId: ctx.arguments.input.storyId,
        comment: ctx.arguments.input.comment,
    };
}
export { request, response };
