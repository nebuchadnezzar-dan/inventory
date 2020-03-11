require 'rails_helper'

RSpec.describe 'Create a order', type: :system do

  it 'Allows create and save a new order' do
    sign_in_as_user
    warehouse_one = create(:warehouse, province: 'Province One', city: 'City One', street: 'Street One')
    visit '/orders/new'

    fill_in_order_field('customer_name', with: 'Customer Name')
    select_warehouse_field('warehouse_id', with: warehouse_one.full_address)
    submit_form

    order = Order.find_by(customer_name: 'Customer Name', warehouse_id: warehouse_one.id)
    
    expect(page).to have_atrribute('full_address', value: 'Street One, City One, Province One', record: order)
    expect(page).to have_atrribute('customer_name', value: 'Customer Name', record: order)
    expect(page).to have_a_success_message
  end

  it 'shows form errors' do
    sign_in_as_user
    visit '/orders/new'

    submit_form

    expect(page).to show_error_for('customer_name', message: 'can\'t be blank')

  end

  private

  def fill_in_order_field(name, with:)
    page.find("#order_#{name}").fill_in(with: with)
  end

  def select_warehouse_field(name, with:)
    select(with, from: "order_#{name}")
  end

  def submit_form
    page.find('#submit-order-edit-button').click
  end

  def have_atrribute(name, value:, record:)
    have_css("#order--#{record.id}_#{name}", text: value)
  end

  def have_a_success_message
    have_text('Successfully created an order!')
  end

  def show_error_for(name, message:)
    have_css("#order_#{name}_errors .error", text: message)
  end

end