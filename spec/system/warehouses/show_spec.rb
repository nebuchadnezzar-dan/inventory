require 'rails_helper'

RSpec.describe 'Show the warehouse page', type: :system do
  it 'shows all warehouse information and product associated with it' do
    sign_in_as_user
    products = create_list(:product, 1, sku: 'CAS-012', name: 'Casio Watch')
    warehouse = create(:warehouse, city: 'City', province: 'Province', street: 'Street')
    create(:stock, product: products.first, warehouse: warehouse, count: 5)
    visit "/warehouses/#{warehouse.id}"

    expect(page).to have_attribute_of('province', record: warehouse, value: 'Province')
    expect(page).to have_attribute_of('city', record: warehouse, value: 'City')
    expect(page).to have_attribute_of('street', record: warehouse, value: 'Street')
    expect(page).to have_attribute_of('product_name', record: warehouse.products.first, value: warehouse.products.first.name)
    expect(page).to have_attribute_of('inventory_count', record: warehouse, value: warehouse.inventory_count(products.first))
    expect(page).to have_back_button
  end

  describe 'Create new Stock' do
    it 'Allows to create and add new stock' do
      sign_in_as_user
      product = create(:product, sku: 'CAS-012', name: 'Casio Watch')
      warehouse = create(:warehouse, city: 'City', province: 'Province', street: 'Street')
      visit "/warehouses/#{warehouse.id}"

      fill_in_stock_field('count', with: 3, associated: product)
      submit_form(record: product)

      stocks = Stock.where(product: product, warehouse: warehouse)

      expect(page).to have_attribute_of('product_name', record: stocks.first.product, value: 'Casio Watch')
      expect(page).to have_attribute_of('inventory_count', record: warehouse, value: warehouse.inventory_count(product))
      have_a_success_message
    end
  end


  private

  def have_attribute_of(name, record:, value:)
    have_css("#warehouse--#{record.id}_#{name}", text: value)
  end

  def have_back_button
    have_link('Back', href: '/warehouses')
  end

  def fill_in_stock_field(name, with:, associated:)
    page.find("#stock_#{name}--#{associated.id}").fill_in(with: with)
  end

  def submit_form(record:)
    page.find("#stock_submit--#{record.id}").click
  end

end