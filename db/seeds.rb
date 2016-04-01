# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
User.delete_all
Board.delete_all
List.delete_all
Card.delete_all
CardMember.delete_all

puts 'Creating seeds'

user = User.create(email: Faker::Internet.email, password: "12345678")

5.times do 
  board = user.boards.build(title: Faker::Book.title) 
  board.save
  5.times do
    list = board.lists.build(
      title: Faker::Book.title,
      description: Faker::Lorem.paragraph 
    ) 
    list.save
    5.times do |card_index|
      card = list.cards.create(
        title: Faker::Book.title,
        description: Faker::Lorem.paragraph, 
        priority: card_index+1,
        completed: [true, false].sample 
      )
      card.save
    end  
  end 
end


20.times do |index|
  User.create(email: Faker::Internet.email, password: "12345678")
end 
User.create(email: "deepakackar@gmail.com", password: "12345678")
User.create(email: "foobar@gmail.com", password: "12345678")

