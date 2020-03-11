require 'rails_helper'

RSpec.describe Warehouse, type: :model do
  describe 'validations' do
    subject(:warehouse) { build(:warehouse) }

    it { is_expected.to validate_presence_of(:city) }
    it { is_expected.to validate_presence_of(:province) }
  end

  describe 'association' do
    subject(:warehouse) { build(:warehouse) }

    it { is_expected.to have_many(:products) }
    it { is_expected.to have_many(:stocks).dependent(:destroy) }
    it { is_expected.to have_many(:orders) }
  end

  describe 'products' do
    it 'test distinct product queries'do
      warehouse = create(:warehouse)
      product = create(:product)
      create_list(:stock, 2, warehouse: warehouse, product: product)
      # warehouse.reload

      product_count = warehouse.products.where(id: product.id).size

      expect(product_count).to eq(1)
    end
  end

  describe 'methods'do
    describe '#full_address' do
      it 'outputs the full address' do
        warehouse = create(:warehouse, city: 'City', street: 'Street', province: 'Province')

        address = warehouse.full_address

        expect(address).to eq('Street, City, Province')
      end
    end

    describe '#stock_count' do
      it 'outputs the sum of product count' do
        warehouse = create(:warehouse)
        product = create(:product)
        create_list(:stock, 3, warehouse: warehouse, product: product, count: 10)

        sum = warehouse.stock_count(product)

        expect(sum).to eq(30)
      end
    end

    describe '#order_quantity' do
      it 'outputs the quantity of order items product' do
        warehouse = create(:warehouse)
        product = create(:product)
        order = create(:order, warehouse: warehouse)
        create_list(:order_item, 3, order: order, product: product, quantity: 5)

        quantity = warehouse.order_quantity(product)

        expect(quantity).to eq(15)
      end
    end

    describe '#inventory_count' do
      it 'outputs the total inventory of a product' do
        warehouse = create(:warehouse)
        product = create(:product)
        order = create(:order, warehouse: warehouse)

        create_list(:stock, 4, warehouse: warehouse, product: product, count: 10)
        create_list(:order_item, 3, order: order, product: product, quantity: 7)

        total = warehouse.inventory_count(product)

        expect(total).to eq(19)
      end
    end

  end

end
