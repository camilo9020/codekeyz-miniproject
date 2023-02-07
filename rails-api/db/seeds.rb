# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

['where are you from?', 'how old are you?', 'what is your profession?', 'are you married?', 'which is you favorite food?'].each do |question|
  Question.create(title: question)
end
