require 'rails_helper'

RSpec.describe 'Show the product page', type: :system do
  it 'shows all product information and warehouse associated with it' do
    sign_in_as_user
    product = create(:product, sku: 'CAS-012', name: 'Casio Watch')
    warehouses = create_list(:warehouse, 1, city: 'City', province: 'Province', street: 'Street')
    create(:stock, product: product, warehouse: warehouses.first, count: 5)
    visit "/products/#{product.id}"

    expect(page).to have_attribute_of('sku', para_sa: product, value: 'CAS-012')
    expect(page).to have_attribute_of('name', para_sa: product, value: 'Casio Watch')
    expect(page).to have_attribute_of('full_address', para_sa: product.warehouses.first, value: product.warehouses.first.full_address)
    expect(page).to have_attribute_of('stock_count', para_sa: product.warehouses.first, value: product.warehouses.first.stock_count(product))
    expect(page).to have_back_button
  end

  private

  def have_attribute_of(name, para_sa:, value:)
    have_css("#product--#{para_sa.id}_#{name}", text: value)
  end

  def have_back_button
    have_link('Back', href: '/products')
  end

end