require 'rails_helper'

RSpec.describe 'Index of warehouses', type: :system do

  it 'has table for warehouse' do
    sign_in_as_user
    warehouse = create(:warehouse, street: 'A Street', city: 'A city', province: 'A province')

    visit '/warehouses'

    expect(page).to have_a_warehouse_table
    expect(page).to have_table_headers_with(text: '#')
    expect(page).to have_table_headers_with(text: 'Address')
    expect(page).to have_table_headers_with(text: 'Action')
    # expect(page).to have_column_for('id', value: '1', record: warehouse)
    expect(page).to have_column_for('address', value: 'A street, A city, A province', record: warehouse)
    # expect(page).to have_column_for('actions', value: 'A street, A city, A province', record: warehouse)
    expect(page).to have_actions_of("\u{1F441}", path: "/warehouses/#{warehouse.id}", record: warehouse)
    expect(page).to have_actions_of("\u{270E}", path: "/warehouses/#{warehouse.id}/edit", record: warehouse)
    expect(page).to have_actions_of("\u{1F5D1}", path: "/warehouses/#{warehouse.id}", record: warehouse)
    expect(page).to have_a_new_button

  end

  private 

  def have_a_warehouse_table
    have_css('table')
  end

  def have_table_headers_with(text:)
    have_css('table tr th', text: text)
  end

  def have_column_for(title, value:, record:)
    have_css("table tbody tr td#warehouse--#{record.id}__#{title}")
  end

  def have_actions_of(title, path:, record:)
    within("table tbody tr td#warehouse--#{record.id}__actions") do
      have_link(title, href: path)
    end
  end

  def have_a_new_button
    have_link('New Warehouse', href: '/warehouses/new')
  end

end