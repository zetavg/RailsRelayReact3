class RelationConnection < GraphQL::Relay::BaseConnection
  def cursor_from_node(item)
    Base64.strict_encode64("#{item.id}")
  end

  def has_next_page
    !!(first && sliced_nodes.count > limit)
  end

  def has_previous_page
    !!(last && offset > 0)
  end

  private

  # apply first / last limit results
  def paged_nodes
    @paged_nodes ||= sliced_nodes.offset(offset).limit(limit)
  end

  # Apply cursors to edges
  def sliced_nodes
    @sliced_nodes ||= begin
      case arguments[:order] || 'newest'
      when 'newest'
        if after
          nodes.where("created_at < ?", created_at_from_cursor(after)).order(created_at: :desc)
        elsif before
          nodes.where("created_at > ?", created_at_from_cursor(before)).order(created_at: :desc)
        else
          nodes.order(created_at: :desc)
        end
      when 'oldest'
        if after
          nodes.where("created_at > ?", created_at_from_cursor(after)).order(created_at: :asc)
        elsif before
          nodes.where("created_at < ?", created_at_from_cursor(before)).order(created_at: :asc)
        else
          nodes.order(created_at: :asc)
        end
      else
        raise GraphQL::ExecutionError, "Unknown order: #{order}"
      end
    end
  end

  def object_id_from_cursor(cursor)
    Base64.decode64(cursor).to_i
  end

  def object_from_cursor(cursor)
    nodes.find(object_id_from_cursor(cursor))
  end

  def created_at_from_cursor(cursor)
    object_from_cursor(cursor).created_at
  end

  # Offset for paging
  def offset
    @offset ||= if last
      [sliced_nodes.count - last, 0].max
    else
      0
    end
  end

  # Limit for paging
  def limit
    @limit ||= begin
      limit_from_arguments = first || last
      [limit_from_arguments, max_page_size].compact.min
    end
  end
end
