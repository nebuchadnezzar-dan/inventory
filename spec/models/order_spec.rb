require 'rails_helper'

RSpec.describe Order, type: :model do
  describe 'validations' do
    subject(:order) { build(:order) }

    it { is_expected.to validate_presence_of(:customer_name) }
  end

  describe 'association' do
    subject(:order) { build(:order) }

    it { is_expected.to belong_to(:warehouse) }
    it { is_expected.to have_many(:order_items).dependent(:destroy) }
    it { is_expected.to have_many(:products) }
  end

  describe 'callbacks' do
    describe 'before_validation' do
      describe '#assign_uuid' do
        it 'assigns a randomly generated uui' do
          order = build(:order, uuid: nil)

          order.valid?

          expect(order.uuid.present?).to eq(true)
        end
      end
    end
  end
end
