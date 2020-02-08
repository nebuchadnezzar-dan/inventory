require 'rails_helper'

RSpec.describe Order, type: :model do
  describe "validations" do
    subject(:order) {build(:order)}

    it { is_expected.to validate_presence_of(:customer_name)}
  end

  describe 'association' do
    subject(:order) { build(:order) }

    it { is_expected.to belong_to(:warehouse) }
  end
  # pending "add some examples to (or delete) #{__FILE__}"
end
