CommentType = GraphQL::ObjectType.define do
  name "Comment"
  interfaces [RelayNodeIdentification.interface]
  global_id_field :id

  field :content, types.String
end
