require 'rails_helper'

RSpec.describe 'Create new warehouse', type: :system do
  it 'Allows to create and save new warehouse' do
    sign_in_as_user
    visit '/warehouses/new'

    fill_in_warehouse_field('province', with: 'A province')
    fill_in_warehouse_field('city', with: 'A city')
    fill_in_warehouse_field('street', with: 'A street')
    submit_form

    warehouse = Warehouse.find_by(province: 'A province', city: 'A city', street: 'A street')

    expect(page).to have_attribute_of('province', value: 'A province', record: warehouse)
    expect(page).to have_attribute_of('city', value: 'A city', record: warehouse)
    expect(page).to have_attribute_of('street', value: 'A street', record: warehouse)
    have_a_success_message
  end

  it 'shows form errors' do
    sign_in_as_user
    visit '/warehouses/new'

    submit_form
    expect(page).to show_error_for('province', message: 'can\'t be blank')
    expect(page).to show_error_for('city', message: 'can\'t be blank')
    # expect(page).to show_error_for('street', message: 'can\'t be blank')

  end

  private 

  def fill_in_warehouse_field(name, with:)
    page.find("#warehouse_#{name}").fill_in(with: with)
  end

  def submit_form
    page.find('#warehouse-edit-submit').click
  end

  def have_attribute_of(name, value:, record:)
    have_css("#warehouse--#{record.id}_#{name}", text: value)
  end

  def have_a_success_message
    have_text('Successfully created a warehouse!')
  end

  def show_error_for(name, message:)
    have_css("#warehouse_#{name}_errors .error", text: message)
  end
end