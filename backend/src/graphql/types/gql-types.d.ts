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

export type Current = {
    __typename?: 'Current';
    interval?: Maybe<Scalars['Int']['output']>;
    temperature_2m?: Maybe<Scalars['Float']['output']>;
    time?: Maybe<Scalars['String']['output']>;
    wind_speed_10m?: Maybe<Scalars['Float']['output']>;
};

export type CurrentUnits = {
    __typename?: 'CurrentUnits';
    interval?: Maybe<Scalars['String']['output']>;
    temperature_2m?: Maybe<Scalars['String']['output']>;
    time?: Maybe<Scalars['String']['output']>;
    wind_speed_10m?: Maybe<Scalars['String']['output']>;
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

export type IpInfo = {
    __typename?: 'IpInfo';
    city_name?: Maybe<Scalars['String']['output']>;
    country_code?: Maybe<Scalars['String']['output']>;
    country_name?: Maybe<Scalars['String']['output']>;
    ip?: Maybe<Scalars['String']['output']>;
    latitude?: Maybe<Scalars['Float']['output']>;
    longitude?: Maybe<Scalars['Float']['output']>;
    region_name?: Maybe<Scalars['String']['output']>;
    time_zone?: Maybe<Scalars['String']['output']>;
    zip_code?: Maybe<Scalars['String']['output']>;
};

export type IpInput = {
    ip: Scalars['String']['input'];
};

export type IpWeatherInfo = {
    __typename?: 'IpWeatherInfo';
    ipInfo?: Maybe<IpInfo>;
    weather?: Maybe<WeatherInfo>;
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
    getIpWeatherInfo?: Maybe<IpWeatherInfo>;
    getStory?: Maybe<StoryWithComments>;
    getUrlHttpDataSource?: Maybe<Scalars['String']['output']>;
    getUrlLambdaDataSource?: Maybe<Scalars['String']['output']>;
};

export type QueryFetchStoriesArgs = {
    input?: InputMaybe<FetchStoriesInput>;
};

export type QueryGetIpWeatherInfoArgs = {
    input: IpInput;
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

export type WeatherInfo = {
    __typename?: 'WeatherInfo';
    current?: Maybe<Current>;
    current_units?: Maybe<CurrentUnits>;
    elevation?: Maybe<Scalars['Int']['output']>;
    generationtime_ms?: Maybe<Scalars['Float']['output']>;
    latitude?: Maybe<Scalars['Float']['output']>;
    longitude?: Maybe<Scalars['Float']['output']>;
    timezone?: Maybe<Scalars['String']['output']>;
    timezone_abbreviation?: Maybe<Scalars['String']['output']>;
    utc_offset_seconds?: Maybe<Scalars['Int']['output']>;
};
