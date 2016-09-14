MutationType = GraphQL::ObjectType.define do
  name "Mutation"

  field :createPost, field: CreatePostMutation.field
end
