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

puts 'Creating User seeds'
20.times do |index|
  User.create(email: Faker::Internet.email, password: "12345678")
end 
User.create(email: "deepakackar@gmail.com", password: "12345678")
User.create(email: "foobar@gmail.com", password: "12345678")


puts 'Creating Boards and Lists and Cards'

5.times do |index| 
 Board.create(title: "Board Title #{index+1}") 
 5.times do |list_index|
   List.create(title: "List Title #{index+1} - #{list_index+1}", board_id: index+1) 
   5.times do |card_index| 
      Card.create(
        title: "Card Title #{list_index+1} - #{card_index+1}",
        list_id: list_index+1, 
        description: "Foo Bar #{list_index+1} - #{card_index+1}", 
        priority: card_index+1,
        completed: false)
   end  
 end 
end


puts 'Creating Card Members'

# 5.times do |index|

# end  