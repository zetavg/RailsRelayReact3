QueryType = GraphQL::ObjectType.define do
  name 'Query'
  description 'The query root for the schema'

  field :node, field: RelayNodeIdentification.field

  field :post do
    type PostType
    argument :id, !types.ID
    resolve -> (_obj, args, ctx) {
      ctx[:type_name] = :Post
      RelayNodeIdentification.object_from_id(args[:id], ctx)
    }
  end
end
