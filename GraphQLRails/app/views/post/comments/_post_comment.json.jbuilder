json.extract! post_comment, :id, :content, :created_at, :updated_at
json.url post_comment_url(post_comment, format: :json)