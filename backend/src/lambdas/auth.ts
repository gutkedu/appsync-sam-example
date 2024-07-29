import { AppSyncAuthorizerEvent, AppSyncAuthorizerResult } from 'aws-lambda';

export async function authHandler(req: AppSyncAuthorizerEvent): Promise<AppSyncAuthorizerResult> {
    try {
        console.log('authHandler', req);

        return {
            isAuthorized: true,
            // Add context to be passed to the resolvers here
            resolverContext: undefined,
        };
    } catch (error) {
        console.log(error);
        return {
            isAuthorized: false,
            resolverContext: undefined,
        };
    }
}
