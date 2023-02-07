class CreateFormDurations < ActiveRecord::Migration[7.0]
  def change
    create_table :form_durations do |t|
      t.integer :duration_in_seconds

      t.timestamps
    end
  end
end
