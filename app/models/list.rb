class List < ActiveRecord::Base
  validates :name, presence: true

  belongs_to :user
  belongs_to :media
end
