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

    describe '#products' do
      it 'returns distinct records' do
        warehouse = create(:warehouse)
        product = create(:product)
        create_list(:stock, 2, warehouse: warehouse, product: product)
        warehouse.reload

        product_size = warehouse.products.where(id: product.id).size

        expect(product_size).to eq(1)
      end
    end
  end
end
