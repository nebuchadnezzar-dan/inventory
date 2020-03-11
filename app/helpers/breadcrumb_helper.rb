module BreadcrumbHelper

  def breadcrumbs(request_link)
    path_array = request_link.split('/')
    return [(content_tag :li, 'Home', class: 'breadcrumb-item active')] if path_array.empty?

    map_list_to_elements(path_array)
  end

  private

  def map_list_to_elements(path_array)
    list = []
    path_string = ''

    path_array.each_with_index do |link, index| 
      path_string << "#{link}/" 
      list << check_if_last_item(index, path_array.size, link, path_string)
    end
    list
    
  end

  def check_if_last_item(index, size, link, path)
    ( index.eql?(size - 1) ? (content_tag :li, link.capitalize, class: 'breadcrumb-item active') : (content_tag :li, (link_to link.empty? ? 'Home' : link.capitalize, link.empty? ? '/' : path), class: 'breadcrumb-item' ) )
  end
  
end