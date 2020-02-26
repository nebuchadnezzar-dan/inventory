require 'rails_helper'

RSpec.describe 'Edit page for Orders', type: :system do

  it 'allows to edit order' do
    sign_in_as_user
    warehouse_one = create(:warehouse, province: 'Province One', city: 'City One', street: 'Street One')
    warehouse_two = create(:warehouse, province: 'Province Two', city: 'City Two', street: 'Street Two')
    order = create(:order, warehouse_id: warehouse_one.id, customer_name: 'A name')

    visit "/orders/#{order.id}/edit"

    expect(page).to have_value_of(warehouse_one.id, attr: 'warehouse_id')
    expect(page).to have_value_of('A name', attr: 'customer_name')

    select_warehouse_select_field('warehouse_id', with: warehouse_two.full_address)
    fill_in_warehouse_field('customer_name', with: 'Another Name')
    submit_form

    expect(page).to have_attribute_of('full_address', value: 'Street Two, City Two, Province Two', record: order)
    expect(page).to have_attribute_of('customer_name', value: 'Another Name', record: order)
    have_a_success_message
    expect(page).to have_back_button

  end

  it 'shows form errors' do
    sign_in_as_user
    warehouse = create(:warehouse, province: 'Province Two', city: 'City Two', street: 'Street Two')
    order = create(:order, warehouse_id: warehouse.id, customer_name: 'A name')

    visit "/orders/#{order.id}/edit"

    fill_in_warehouse_field('customer_name', with: '')
    submit_form

    expect(page).to show_error_for('customer_name', message: 'can\'t be blank')

  end

  private

  def have_value_of(value, attr:)
    have_field("order_#{attr}", with: value)
  end

  def select_warehouse_select_field(name, with:)
    select(with, from: "order_#{name}")
  end

  def fill_in_warehouse_field(name, with:)
    page.find("#order_#{name}").fill_in(with: with)
  end

  def submit_form
    page.find("#submit-order-edit-button").click
  end

  def have_attribute_of(name, value:, record:)
    have_css("#order--#{record.id}_#{name}", text: value)
  end

  def have_back_button
    have_link('Back', href: '/orders')
  end

  def show_error_for(name, message:)
    have_css("#order_#{name}_errors .error", text: message)
  end

  def have_a_success_message
    have_text('Order was successfully updated.')
  end

end