module DisplayTableHelper

  def map_over_records(record)
    record_hash = {}
    (record.attributes.keys - ['id', 'created_at', 'updated_at']).each { |rec| record_hash[rec] = record[rec] }
    record_hash
  end  
  
end