export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type FetchStories = {
    __typename?: 'FetchStories';
    nextToken?: Maybe<Scalars['String']['output']>;
    stories?: Maybe<Array<Maybe<Story>>>;
};

export type FetchStoriesInput = {
    limit?: InputMaybe<Scalars['Int']['input']>;
    token?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    createStory: Story;
    createStoryComment: StoryComment;
};

export type MutationCreateStoryArgs = {
    input: StoryInput;
};

export type MutationCreateStoryCommentArgs = {
    input: StoryCommentInput;
};

export type Query = {
    __typename?: 'Query';
    fetchStories?: Maybe<FetchStories>;
    fetchStoryComments?: Maybe<Array<Maybe<StoryComment>>>;
    getStory?: Maybe<StoryWithComments>;
    getUrlHttpDataSource?: Maybe<Scalars['String']['output']>;
    getUrlLambdaDataSource?: Maybe<Scalars['String']['output']>;
};

export type QueryFetchStoriesArgs = {
    input?: InputMaybe<FetchStoriesInput>;
};

export type QueryFetchStoryCommentsArgs = {
    storyId: Scalars['ID']['input'];
};

export type QueryGetStoryArgs = {
    storyId: Scalars['ID']['input'];
};

export type Story = {
    __typename?: 'Story';
    content: Scalars['String']['output'];
    createdAt: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    title: Scalars['String']['output'];
};

export type StoryComment = {
    __typename?: 'StoryComment';
    comment: Scalars['String']['output'];
    createdAt: Scalars['String']['output'];
    id: Scalars['ID']['output'];
    storyId: Scalars['ID']['output'];
};

export type StoryCommentInput = {
    comment: Scalars['String']['input'];
    storyId: Scalars['ID']['input'];
};

export type StoryInput = {
    content: Scalars['String']['input'];
    title: Scalars['String']['input'];
};

export type StoryWithComments = {
    __typename?: 'StoryWithComments';
    comments?: Maybe<Array<Maybe<StoryComment>>>;
    story: Story;
};
