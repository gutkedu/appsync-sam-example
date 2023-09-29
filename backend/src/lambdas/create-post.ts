import { AppSyncResolverHandler } from 'aws-lambda';
import { Post, PostInput } from '../../graphql/appsync';
import { randomUUID } from 'crypto';

export const createPostHandler: AppSyncResolverHandler<PostInput, Post> = async (event) => {
    const { content, title } = event.arguments;

    const post: Post = {
        __typename: 'Post',
        id: randomUUID(),
        title,
        content,
        publishedAt: '2020-01-01',
    };

    return post;
};
