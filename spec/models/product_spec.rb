require 'rails_helper'

RSpec.describe Product, type: :model do
  it { is_expected.to validate_presence_of(:name)}
  describe "validations" do
    subject(:product) {build(:product)}

    it { is_expected.to validate_presence_of(:sku)}
    it { is_expected.to validate_uniqueness_of(:sku)}

    # it 'validates the presence of name' do
    #   # record = build(:product, sku:nil)
    #   product.name = nil
    #
    #   #if nil is value it won't be valid
    #   expect(product.valid?).to eq(false)
    # end
    #
    # it 'validates the presence of sku' do
    #   # record = build(:product, sku:nil)
    #   product.sku = nil
    #
    #   expect(product.valid?).to eq(false)
    # end
    #
    # it 'validates the uniqueness of sku' do
    #   existing_product = create(:product, sku: 'PROD-001')
    #   product.sku = existing_product
    #
    #   expect(product.valid?).to eq(false)
    # end

  end
  describe 'association' do
    subject(:product) { build(:product) }

    it { is_expected.to have_many(:stocks) }
    it { is_expected.to have_many(:warehouses) }
  end
  # pending "add some examples to (or delete) #{__FILE__}"
end
