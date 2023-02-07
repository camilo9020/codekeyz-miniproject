class Api::V1::AnswersController < ApplicationController

  # POST /answers
  def create
    @answers = []

    form_duration = FormDuration.create(duration: params[:durationInSeconds].to_f.ceil)
    answers_params.each do |answer|
      result = Answer.create(question_id: answer["questionId"], title: answer["title"], form_duration: form_duration )
      @answers << { id: result.id, title: result.title, questionId: result.question_id, saved: result.id ? true : false }
    end

    render json: @answers, status: :created
  end

  private
    def answers_params
      params.require(:answers)
    end
end
