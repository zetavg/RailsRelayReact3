class Site
  def id
    'site'
  end

  def posts
    Post.all
  end
end
