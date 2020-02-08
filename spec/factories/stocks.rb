FactoryBot.define do
  factory :stock do
    count { 1 }
    product { Product.first || association(:product) }
    warehouse { Product.first || association(:warehouse) }
  end
end
