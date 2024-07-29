// src/graphql/modules/story-comment/create-story-comment.resolver.ts
import { util as util2 } from "@aws-appsync/utils";

// src/graphql/shared/is-valid-ksuid.ts
function isValidKSUID(id) {
  const PatternKSUIDRegex = "^[0-9a-zA-Z]{27}$";
  return util.matches(PatternKSUIDRegex, id);
}

// src/graphql/modules/story-comment/create-story-comment.resolver.ts
function request(ctx) {
  const { comment, storyId } = ctx.prev.result;
  if (!isValidKSUID(storyId)) {
    util2.error("Invalid storyId");
  }
  return {
    operation: "PutItem",
    key: util2.dynamodb.toMapValues({
      pk: `STORY#${storyId}`,
      sk: `COMMENT#${util2.autoKsuid()}`
    }),
    condition: {
      expression: "attribute_not_exists(#sk)",
      expressionNames: {
        "#sk": "sk"
      }
    },
    attributeValues: util2.dynamodb.toMapValues({
      comment,
      createdAt: util2.time.nowISO8601()
    })
  };
}
function response(ctx) {
  if (ctx.error) {
    util2.error(ctx.error.message);
  }
  const { pk, sk, comment, createdAt } = ctx.result;
  return {
    id: sk.split("#")[1],
    storyId: pk.split("#")[1],
    comment,
    createdAt
  };
}
export {
  request,
  response
};
