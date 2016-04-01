class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :board_memberships
  has_many :boards, :through => :board_memberships

  has_many :card_memberships, :through => :board_memberships
  has_many :cards, :through => :card_memberships


  has_many :boards

  has_many :lists, :through => :boards


end

