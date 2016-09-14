GraphQLSchema = GraphQL::Schema.new(
  query: QueryType,
  mutation: MutationType,
  max_depth: 8
)

GraphQLSchema.node_identification = RelayNodeIdentification
GraphQL::Relay::BaseConnection.register_connection_implementation(ActiveRecord::Relation, RelationConnection)
