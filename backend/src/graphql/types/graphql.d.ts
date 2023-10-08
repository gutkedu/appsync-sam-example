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
    AWSDate: { input: any; output: any };
    AWSDateTime: { input: any; output: any };
    AWSEmail: { input: any; output: any };
    AWSIPAddress: { input: any; output: any };
    AWSJSON: { input: any; output: any };
    AWSPhone: { input: any; output: any };
    AWSTime: { input: any; output: any };
    AWSTimestamp: { input: any; output: any };
    AWSURL: { input: any; output: any };
};

export type Mutation = {
    __typename?: 'Mutation';
    createStory: Story;
};

export type MutationCreateStoryArgs = {
    input: StoryInput;
};

export type Query = {
    __typename?: 'Query';
    storiesInCsv?: Maybe<Scalars['String']['output']>;
    story?: Maybe<Story>;
};

export type QueryStoryArgs = {
    id: Scalars['ID']['input'];
};

export type Story = {
    __typename?: 'Story';
    content: Scalars['String']['output'];
    createdAt?: Maybe<Scalars['AWSDateTime']['output']>;
    id: Scalars['ID']['output'];
    title: Scalars['String']['output'];
};

export type StoryInput = {
    content: Scalars['String']['input'];
    title: Scalars['String']['input'];
};

export type AwsDate = Scalars['AWSDate'];
export type AwsDateTime = Scalars['AWSDateTime'];
export type AwsEmail = Scalars['AWSEmail'];
export type AwsipAddress = Scalars['AWSIPAddress'];
export type Awsjson = Scalars['AWSJSON'];
export type AwsPhone = Scalars['AWSPhone'];
export type AwsTime = Scalars['AWSTime'];
export type AwsTimestamp = Scalars['AWSTimestamp'];
export type Awsurl = Scalars['AWSURL'];
