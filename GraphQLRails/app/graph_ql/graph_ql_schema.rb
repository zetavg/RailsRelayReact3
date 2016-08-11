GraphQLSchema = GraphQL::Schema.new(
  query: QueryType,
  max_depth: 8
)

GraphQLSchema.node_identification = RelayNodeIdentification
