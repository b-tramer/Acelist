class List < ActiveRecord::Base
  belongs_to :user
  validates :name, presence: true
  has_many :media_lists
  has_many :media, through: :media_lists

  def media_attributes=(attributes)
    attributes.each do |item|
      if item[:data_id].nil?
        self.media << Media.last
      else
        self.media << Media.find(item[:id])
      end
    end
  end

end
