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

  field :comment do
    type CommentType
    argument :id, !types.ID
    resolve -> (_obj, args, ctx) {
      ctx[:type_name] = :Comment
      RelayNodeIdentification.object_from_id(args[:id], ctx)
    }
  end

  field :site do
    type SiteType
    resolve -> (_obj, _args, _ctx) { Object }
  end
end
