require 'rails_helper'

RSpec.describe 'Index of Orders', type: :system do 

  it 'has table of orders', :js do
    sign_in_as_user
    warehouse = create(:warehouse, province: 'province', city: 'city', street: 'street')
    order = create(:order, warehouse_id: warehouse.id, customer_name: 'customer' )

    visit '/orders'

    expect(page).to have_a_order_table
    expect(page).to have_table_headers_with(text: '#')
    expect(page).to have_table_headers_with(text: 'Warehouse')
    expect(page).to have_table_headers_with(text: 'Customer Name')
    expect(page).to have_table_headers_with(text: 'Action')
    expect(page).to have_column_for('full_address', value: 'street, city, province', record: order)
    expect(page).to have_column_for('customer_name', value: 'customer', record: order)
    expect(page).to have_actions_of("\u{1F441}", path: "/orders/#{order.id}", record: order)
    expect(page).to have_actions_of("\u{270E}", path: "/orders/#{order.id}/edit", record: order)
    expect(page).to have_actions_of("\u{1F5D1}", path: "/orders/#{order.id}", record: order)
    expect(page).to have_a_new_button

    page.find("table tbody tr#order--#{order.id} td#order--#{order.id}_actions .delete").click

    text = page.driver.browser.switch_to.alert.text

    expect(text).to eq('Are you sure you want to delete this order?')

  end

  it 'allows to delete an order', :js do
    sign_in_as_user

    warehouse = create(:warehouse, province: 'province', city: 'city', street: 'street')
    order = create(:order, warehouse_id: warehouse.id, customer_name: 'customer' )

    visit '/orders'
    page.find("table tbody tr#order--#{order.id} td#order--#{order.id}_actions .delete").click
    page.driver.browser.switch_to.alert.accept

    expect(page).not_to have_column_for('customer_name', value: 'customer', record: order)
    expect(page).to have_success_delete_message(order.id)

  end

  private

  def have_a_order_table
    have_css('table')
  end

  def have_table_headers_with(text:)
    have_css('table thead tr th', text: text)
  end

  def have_column_for(title, value:, record:)
    have_css("table tbody tr#order--#{record.id} td#order--#{record.id}_#{title}", text: value)
  end

  def have_actions_of(title, path:, record:)
    within("table tbody tr#order--#{record.id} td#order--#{record.id}_actions") do
      have_link(title, href: path)
    end
  end

  def have_a_new_button
    have_link('New Order', href: '/orders/new')
  end

  def have_success_delete_message(id)
    have_text("Order #{id} was successfully deleted.")
  end

end