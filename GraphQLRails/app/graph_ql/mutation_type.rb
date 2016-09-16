MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createPost, field: CreatePostMutation.field
  field :createComment, field: CreateCommentMutation.field
end
