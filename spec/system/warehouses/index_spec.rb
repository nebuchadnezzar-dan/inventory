require 'rails_helper'

RSpec.describe 'Index of warehouses', type: :system do

  it 'has table for warehouse', :js do
    sign_in_as_user
    warehouse = create(:warehouse, street: 'A Street', city: 'A city', province: 'A province')

    visit '/warehouses'

    expect(page).to have_a_warehouse_table
    expect(page).to have_table_headers_with(text: '#')
    expect(page).to have_table_headers_with(text: 'Province')
    expect(page).to have_table_headers_with(text: 'Street')
    expect(page).to have_table_headers_with(text: 'City')
    expect(page).to have_table_headers_with(text: 'Action')
    expect(page).to have_column_for('province', value: 'A province', record: warehouse)
    expect(page).to have_column_for('city', value: 'A city', record: warehouse)
    expect(page).to have_column_for('street', value: 'A Street', record: warehouse)
    expect(page).to have_actions_of("\u{1F441}", path: "/warehouses/#{warehouse.id}", record: warehouse)
    expect(page).to have_actions_of("\u{270E}", path: "/warehouses/#{warehouse.id}/edit", record: warehouse)
    expect(page).to have_actions_of("\u{1F5D1}", path: "/warehouses/#{warehouse.id}", record: warehouse)
    expect(page).to have_a_new_button

    page.find("table tbody tr#warehouse--#{warehouse.id} td#warehouse--#{warehouse.id}_actions .delete").click

    text = page.driver.browser.switch_to.alert.text

    expect(text).to eq('Are you sure you want to delete this warehouse?')

  end

  it 'allows to delete a warehouse', :js do
    sign_in_as_user

    warehouse = create(:warehouse, province: 'province', city: 'city', street: 'street')

    visit '/warehouses'
    page.find("table tbody tr#warehouse--#{warehouse.id} td#warehouse--#{warehouse.id}_actions .delete").click
    page.driver.browser.switch_to.alert.accept

    expect(page).not_to have_column_for('province', value: 'province', record: warehouse)
    expect(page).to have_success_delete_message(warehouse.id)
  end

  private 

  def have_a_warehouse_table
    have_css('table')
  end

  def have_table_headers_with(text:)
    have_css('table thead tr th', text: text)
  end

  def have_column_for(title, value:, record:)
    have_css("table tbody tr#warehouse--#{record.id} td#warehouse--#{record.id}_#{title}", text: value)
  end

  def have_actions_of(title, path:, record:)
    within("table tbody tr td#warehouse--#{record.id}_actions") do
      have_link(title, href: path)
    end
  end

  def have_a_new_button
    have_link('New Warehouse', href: '/warehouses/new')
  end

  def have_success_delete_message(id)
    have_text("Warehouse #{id} was successfully deleted.")
  end

end