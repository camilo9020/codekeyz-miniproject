require "test_helper"

class FormDurationsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get form_durations_index_url
    assert_response :success
  end
end
