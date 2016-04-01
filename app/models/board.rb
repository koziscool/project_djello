class Board < ActiveRecord::Base
  
  has_many :board_memberships


  has_many :lists
  belongs_to :user

end
