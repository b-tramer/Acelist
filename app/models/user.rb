class User < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, uniqueness: true
  validates :email, presence: true

  has_many :lists
  has_many :media, through: :lists
end
