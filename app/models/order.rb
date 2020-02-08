class Order < ApplicationRecord
  belongs_to :warehouse
  has_many :order_items
  has_many :products, through: :order_items

  validates :customer_name, presence: true
end
