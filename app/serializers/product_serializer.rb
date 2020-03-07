class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :sku, :inventory_count

  def inventory_count
    return nil unless @instance_options[:warehouse].present?
    @instance_options[:warehouse].inventory_count(object)
  end

end