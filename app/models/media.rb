class Media < ActiveRecord::Base
  has_many :media_lists
  has_many :lists, through: :media_lists
end
