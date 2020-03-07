require 'rails_helper'

RSpec.describe 'Show the order page', type: :system do
  it 'shows all order information and order items associated with it', :js do
    sign_in_as_user
    product = create(:product, sku: 'CAS-012', name: 'Casio Watch')
    warehouse = create(:warehouse, city: 'City', province: 'Province', street: 'Street')
    order = create(:order, customer_name: 'Customer', warehouse: warehouse)
    create_list(:order_item, 1, product: product, order: order, quantity: 3)
    visit "/orders/#{order.id}"

    expect(page).to have_attribute_of('customer_name', record: order, value: 'Customer')
    expect(page).to have_attribute_of('full_address', record: order, value: order.warehouse.full_address)
    expect(page).to have_attribute_of('product_name', record: order.order_items.first, value: 'Casio Watch')
    expect(page).to have_attribute_of('quantity', record: order.order_items.first, value: 3)
    expect(page).to have_buttons_of('&#10006;')
    expect(page).to have_buttons_of('&#10004;')
    expect(page).to have_back_button
  end

  describe 'Create new Order Items' do
    it 'Allows to create and add new order items' do
      sign_in_as_user
      warehouse = create(:warehouse, city: 'City', province: 'Province', street: 'Street')
      order = create(:order, customer_name: 'Customer', warehouse: warehouse)  
      product = create(:product, sku: 'LAP-012', name: 'Laptop')
      visit "/orders/#{order.id}"

      fill_in_order_item_field('quantity', with: 4)
      select_product_field('product_id', with: product.name)
      submit_form

      order_items = OrderItem.where(order: order, product: product)

      expect(page).to have_attribute_of('product_name', record: order_items.first, value: 'Laptop')
      expect(page).to have_attribute_of('quantity', record: order_items.first, value: 4)
      have_a_success_message
    end
  end


  private

  def have_attribute_of(name, record:, value:)
    have_css("#order--#{record.id}_#{name}", text: value)
  end

  def have_back_button
    have_link('Back', href: '/orders')
  end

  def fill_in_order_item_field(name, with:)
    page.find("#order_item_#{name}").fill_in(with: with)
  end

  def select_product_field(name, with:)
    select(with, from: "order_item_#{name}")
  end

  def submit_form
    page.find("#order_item_submit").click
  end

  def have_buttons_of(name)
    # within
  end

end