PostType = GraphQL::ObjectType.define do
  name "Post"
  interfaces [RelayNodeIdentification.interface]
  global_id_field :id

  field :title, types.String
  field :content, types.String

  connection :comments do
    type -> { CommentType.connection_type }
    argument :order, types.String
  end
end
