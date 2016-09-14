CreatePostMutation = GraphQL::Relay::Mutation.define do
  name "CreatePost"

  input_field :title, !types.String
  input_field :content, !types.String

  return_field :post, PostType
  return_field :postEdge, PostType.edge_type
  return_field :site, SiteType

  resolve -> (inputs, _ctx) {
    post = Post.create!(title: inputs[:title], content: inputs[:content])

    {
      post: post,
      postEdge: GraphQL::Relay::Edge.new(post, RelationConnection.new(Post.where(id: post.id), {})),
      site: Site.new
    }
  }
end
