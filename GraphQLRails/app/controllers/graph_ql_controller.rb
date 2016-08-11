class GraphQLController < ApplicationAPIController
  def query
    query_string = params[:query]
    query_variables = params[:variables] || {}
    query = GraphQL::Query.new(GraphQLSchema, query_string, variables: query_variables)
    render json: query.result
  end
end
