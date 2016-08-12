namespace :graph_ql do
  desc "Generate a dump of the GraphQL schema"
  task dump_schema: :environment do
    schema = GraphQLSchema.execute(GraphQL::Introspection::INTROSPECTION_QUERY)
    schema_json = JSON.pretty_generate(schema)

    json_schema_filepath = Rails.root.join('../', 'graphql-schema.json')

    File.open(json_schema_filepath, "w+") do |f|
      f.write(schema_json + "\n")
    end

    puts "Successfully generated JSON schema dump: #{json_schema_filepath}"
  end
end
