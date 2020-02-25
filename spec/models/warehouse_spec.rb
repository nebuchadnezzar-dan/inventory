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
end
