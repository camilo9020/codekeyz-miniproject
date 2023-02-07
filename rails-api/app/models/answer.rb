class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :form_duration
end
