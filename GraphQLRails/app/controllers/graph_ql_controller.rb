class GraphQLController < ApplicationAPIController
  def query
    query = GraphQL::Query.new(GraphQLSchema, query_string, variables: query_variables)
    render json: query.result
  end

  private

  def query_string
    params[:query]
  end

  def query_variables
    if params[:variables].is_a? String
      JSON.parse(params[:variables])
    else
      params[:variables]
    end
  end
end
