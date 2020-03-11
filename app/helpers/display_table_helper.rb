module DisplayTableHelper

  def map_over_records(record, title)
    record_hash = {}
    record_hash['full_address'] = record.warehouse.full_address if title == 'order'
    ( record.attributes.keys - %w[id uuid created_at updated_at warehouse_id] ).each { |rec| record_hash[rec] = record[rec] }
    record_hash
  end  
  
end