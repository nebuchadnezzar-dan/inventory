require 'rails_helper'

RSpec.describe 'Edit warehouse page', type: :system do

  it 'allows to edit a warehouse' do
    sign_in_as_user
    warehouse = create(:warehouse, province: 'province', city: 'city', street: 'street')

    visit "/warehouses/#{warehouse.id}/edit"

    expect(page).to have_value_of('province', attr: 'province')
    expect(page).to have_value_of('city', attr: 'city')
    expect(page).to have_value_of('street', attr: 'street')

    fill_in_warehouse_field('province', with: 'A province')
    fill_in_warehouse_field('street', with: 'A street')
    fill_in_warehouse_field('city', with: 'A city')
    submit_form

    expect(page).to have_attribute_of('province', value: 'A province', record: warehouse)
    expect(page).to have_attribute_of('city', value: 'A city', record: warehouse)
    expect(page).to have_attribute_of('street', value: 'A street', record: warehouse)
    expect(page).to have_success_message
    expect(page).to have_back_button
  end

  it 'shows form errors' do
    sign_in_as_user
    warehouse = create(:warehouse, province: 'probinsya', city: 'lungsod', street: 'kaylye')

    visit "/warehouses/#{warehouse.id}/edit"

    fill_in_warehouse_field('province', with: '')
    fill_in_warehouse_field('city', with: '')
    fill_in_warehouse_field('street', with: '')
    submit_form

    expect(page).to show_error_for('province', message: 'can\'t be blank')
    expect(page).to show_error_for('city', message: 'can\'t be blank')
    # expect(page).to show_error_for('street', message: 'can\'t be blank')

  end

  private

  def have_value_of(value, attr:)
    have_field("warehouse_#{attr}", with: value)
  end

  def fill_in_warehouse_field(name, with:)
    page.find("#warehouse_#{name}").fill_in(with: with)
  end

  def submit_form
    page.find('#warehouse-edit-submit').click
  end

  def have_success_message
    have_text('Warehouse was successfully updated.')
  end

  def have_attribute_of(name, value:, record:)
    have_css("#warehouse--#{record.id}_#{name}", text: value)
  end

  def show_error_for(name, message:)
    have_css("#warehouse_#{name}_errors .error", text: message)
  end

  def have_back_button
    have_link('Back', href: '/warehouses')
  end
end