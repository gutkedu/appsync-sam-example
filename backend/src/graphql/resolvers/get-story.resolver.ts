import { Context, DynamoDBGetItemRequest, util } from '@aws-appsync/utils';
import { Story } from '../types/graphql';

export function request(ctx: Context): DynamoDBGetItemRequest {
    const id = ctx.arguments.id as string;

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

export function response(ctx: Context): Story {
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
