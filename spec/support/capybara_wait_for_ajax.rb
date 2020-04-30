# require 'rails_helper'

module CapybaraWaitForAjax
  def wait_for_ajax
    Timeout.timeout(Capybara.default_max_wait_time) do
      loop until finished_all_ajax_requests?
    end
  end

  def finished_all_ajax_requests?
    page.evaluate_script('window.pendingRequestCount').zero?
  end
end

# RSpec.configure do |config|
#   config.include CapybaraWaitForAjax, type: :system
# end