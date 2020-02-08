class Order < ApplicationRecord
  belongs_to :warehouse
  has_many :products
  has_many :products, through :order_item

  validates :customer_name, presence: true
end
