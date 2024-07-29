// src/graphql/modules/story/get-story.resolver.ts
import { util as util2 } from "@aws-appsync/utils";

// src/graphql/shared/is-valid-ksuid.ts
function isValidKSUID(id) {
  const PatternKSUIDRegex = "^[0-9a-zA-Z]{27}$";
  return util.matches(PatternKSUIDRegex, id);
}

// src/graphql/modules/story/get-story.resolver.ts
function request(ctx) {
  const id = ctx.arguments.storyId;
  if (!isValidKSUID(id)) {
    util2.error("Invalid id");
  }
  return {
    operation: "GetItem",
    key: util2.dynamodb.toMapValues({
      pk: `STORY`,
      sk: `STORY#${id}`
    })
  };
}
function response(ctx) {
  if (ctx.error) {
    return util2.error(ctx.result.error);
  }
  if (!ctx.result) {
    util2.error("Story not found");
  }
  return {
    story: {
      id: ctx.result.sk.split("#")[1],
      content: ctx.result.content,
      title: ctx.result.title,
      createdAt: ctx.result.createdAt
    },
    comments: void 0
  };
}
export {
  request,
  response
};
