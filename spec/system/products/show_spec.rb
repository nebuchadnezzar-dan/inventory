require 'rails_helper'

RSpec.describe 'Show the product page', type: :system do
  it 'shows all product information'  do
    sign_in_as_user
    product = create(:product, sku: 'CAS-012', name: 'Casio Watch')
    visit "/products/#{product.id}"

    expect(page).to have_attribute_of('sku', para_sa: product, value: 'CAS-012')
    expect(page).to have_attribute_of('name', para_sa: product, value: 'Casio Watch')
  end

  private

  def have_attribute_of(name, para_sa:, value:)
    have_css("#product--#{para_sa.id}_#{name}", text: value)
  end

end