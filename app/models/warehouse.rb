class Warehouse < ApplicationRecord
  has_many :stocks, dependent: :destroy
  has_many :products, -> { distinct }, through: :stocks
  has_many :orders

  validates :city, presence: true
  validates :province, presence: true 

  def full_address
    "#{street}, #{city}, #{province}"
  end

  def stock_count(product)
    stocks.where(product: product).pluck(:count).sum
  end

  def order_quantity(product)
    orders.joins(:order_items).where(order_items: { product: product }).pluck(:quantity).sum
  end

  def inventory_count(product)
    stock_count(product) - order_quantity(product)
  end

end

test distinct products

# "#products" dp

# it "distinct" do

# //setup create(:warehouse)
# create(:product)

# create_list(:stock, 2, warehouse: warehouse, product: product)
# warehouse.reload

# product_count = warehouse.products.where(id: product.id).size

# expect(product_size).to eq(1)