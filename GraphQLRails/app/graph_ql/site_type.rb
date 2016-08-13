SiteType = GraphQL::ObjectType.define do
  name 'Site'
  interfaces [RelayNodeIdentification.interface]
  field :id, !types.ID

  connection :posts, max_page_size: 100 do
    type PostType.connection_type
    argument :order, types.String, default_value: 'newest'
  end
end
