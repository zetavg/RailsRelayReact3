PostType = GraphQL::ObjectType.define do
  name "Post"
  interfaces [RelayNodeIdentification.interface]
  global_id_field :id

  field :title, types.String
  field :content, types.String
end
