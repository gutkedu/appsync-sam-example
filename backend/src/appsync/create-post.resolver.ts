import { Context } from '@aws-appsync/utils';
import { Post, PostInput } from '../../graphql/appsync';

export function request(ctx: Context<PostInput>): PostInput {
    console.log('request', ctx);
    const { content, title } = ctx.arguments;
    return {
        content,
        title,
    };
}

export function response(ctx: Context): Post {
    console.log('response', ctx);
    const post = ctx.result as Post;
    return post;
}
