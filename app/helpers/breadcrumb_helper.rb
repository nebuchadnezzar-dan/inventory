module BreadcrumbHelper

  def breadcrumbs(request_link)
    path_array = request_link.split('/') - [""] 
    path_string = '/' 
    return_list = []
    path_array.each_with_index do |link, index| 
      path_string << "#{link}/" 
      return_list << ( index.eql?(path_array.size - 1) ? (content_tag :li, link.capitalize, class: 'breadcrumb-item active') : (content_tag :li, (link_to link.capitalize, path_string), class: 'breadcrumb-item' ) )
    end
    return_list
  end
  
end