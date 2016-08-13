SiteType = GraphQL::ObjectType.define do
  name 'Site'

  connection :latestPosts, max_page_size: 100 do
    type PostType.connection_type
    resolve -> (_obj, _args, _ctx) {
      Post.order(created_at: :desc)
    }
  end
end
