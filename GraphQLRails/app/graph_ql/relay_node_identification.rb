RelayNodeIdentification = GraphQL::Relay::GlobalNodeIdentification.define do
  object_from_id -> (global_id, ctx) do
    begin
      if global_id == 'site'
        Site.new
      else
        type_name, id = RelayNodeIdentification.from_global_id(global_id)

        if ctx[:type_name].present?
          fail unless type_name.to_sym == ctx[:type_name].to_sym
        end

        type_name.constantize.find(id)
      end
    rescue StandardError
      raise GraphQL::ExecutionError, "Couldn't resolve id: #{global_id}"
    end
  end

  type_from_object -> (object) { "#{object.class.name}Type".constantize }
end
