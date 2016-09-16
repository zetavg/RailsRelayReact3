CreateCommentMutation = GraphQL::Relay::Mutation.define do
  name "CreateComment"

  input_field :postID, !types.String
  input_field :content, !types.String

  return_field :comment, CommentType
  return_field :commentEdge, CommentType.edge_type
  return_field :post, PostType

  resolve -> (inputs, _ctx) {
    post = RelayNodeIdentification.object_from_id(inputs[:postID], { type_name: :Post })
    comment = post.comments.create!(content: inputs[:content])

    {
      comment: comment,
      commentEdge: GraphQL::Relay::Edge.new(comment, RelationConnection.new(Comment.where(id: comment.id), {})),
      post: post
    }
  }
end
