FactoryBot.define do
  factory :order do
    uuid { 'MyString' }
    warehouse { Warehouse.first || association(:warehouse) }
    customer_name { 'MyString' }
  end
end
