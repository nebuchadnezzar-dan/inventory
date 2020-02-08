FactoryBot.define do
  factory :order do
    uuid { "MyString" }
    warehouse { nil }
    customer_name { "MyString" }
  end
end
