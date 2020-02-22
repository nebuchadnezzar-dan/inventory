require 'rails_helper'

module AuthHelper
  def sign_in_as_user
    user = create(:user)
    sign_in user
  end
end