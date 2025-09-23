# AWS AppSync GraphQL + Event API Example

This project demonstrates a complete serverless backend using AWS AppSync with both GraphQL API and Event API capabilities, deployed with AWS SAM.

## Architecture

The application consists of:

- **GraphQL API**: Traditional GraphQL operations (queries, mutations) for CRUD operations
- **Event API**: Real-time event streaming for live notifications and updates
- **DynamoDB**: NoSQL database for data persistence
- **Lambda Functions**: Serverless compute for business logic and event publishing
- **Authentication**: Lambda-based auth for both APIs

## Features

### GraphQL API
- Create and fetch stories
- Add comments to stories
- Query stories with comments
- External API proxy functionality

### Event API
- Real-time event publishing
- WebSocket connections for live updates
- Channel-based event routing
- API key authentication

### Integration
- GraphQL mutations automatically publish events
- Real-time notifications when data changes
- Consistent authentication across both APIs

## Prerequisites

- AWS CLI configured with appropriate permissions
- Node.js 22+ and npm
- AWS SAM CLI
- Git

## Deployment

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd appsync-sam-example
   cd backend && npm install && cd ..
   ```

2. **Build the application:**
   ```bash
   make
   ```

3. **Deploy to AWS:**
   ```bash
   sam deploy --profile your-aws-profile --region us-east-1
   ```

   Replace `your-aws-profile` with your actual AWS CLI profile name.

## API Endpoints

After deployment, you'll get these outputs:

- **GraphQL API URL**: `AppSyncGraphQLUrl`
- **Event API HTTP URL**: `EventApiHttpURL`
- **Event API WebSocket URL**: `EventApiWebSocketURL`
- **Event API Key**: `EventApiKey`

## Usage Examples

### GraphQL Operations

The project includes Bruno collections with ready-to-use GraphQL queries and mutations:

**Available Operations:**
- **Queries** (`docs/appsync-sam-example/queries/`):
  - `fetchStories.bru` - Fetch paginated stories
  - `getStory.bru` - Get single story with comments
  - `getUrlHttpDataSource.bru` - Test HTTP data source
  - `getUrlLambdaDataSource.bru` - Test Lambda data source

- **Mutations** (`docs/appsync-sam-example/mutations/`):
  - `createStory.bru` - Create a new story
  - `createStoryComment.bru` - Add comment to story

**To use the Bruno collections:**
1. Install [Bruno](https://www.usebruno.com/)
2. Open the `docs/appsync-sam-example/` directory in Bruno
3. Configure the environment with your GraphQL API URL and auth headers
4. Run the requests to test the API

### Event API

**Connect via WebSocket:**
```
wss://your-event-api-url/event/realtime
```

**Subscribe to Events:**
```javascript
// Subscribe to story events
const subscription = client.subscribe({
  channel: 'default/stories'
});

// Subscribe to comment events
const commentSub = client.subscribe({
  channel: 'default/stories/story-id/comments'
});
```

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── graphql/
│   │   │   ├── schema.graphql
│   │   │   ├── modules/        # TypeScript resolvers
│   │   │   └── resolvers/      # Compiled JS resolvers
│   │   └── lambdas/            # Lambda functions
│   └── package.json
├── template.yaml                # SAM template
├── Makefile                     # Build automation
└── README.md
```

## Development

- **Linting:** `npm run lint`
- **Building:** `make build`
- **Testing:** Deploy and test with GraphQL client or Event API client

## Architecture Benefits

1. **Real-time Updates**: Event API provides live notifications
2. **Scalable**: Serverless architecture auto-scales
3. **Secure**: Lambda-based authentication
4. **Integrated**: GraphQL mutations trigger events automatically
5. **Cost-effective**: Pay-per-use pricing

## Technologies Used

- AWS AppSync (GraphQL + Event APIs)
- AWS Lambda (Node.js/TypeScript)
- Amazon DynamoDB
- AWS SAM
- TypeScript
- GraphQL
