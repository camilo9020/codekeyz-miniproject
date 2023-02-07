class Api::V1::FormDurationsController < ApplicationController
  def index
    @form_durations = FormDuration.all

    render json: @form_durations
  end
end
