class List < ActiveRecord::Base
  belongs_to :user
  validates :name, presence: true
  has_many :media_lists
  has_many :media, through: :media_lists

  # When a user adds more than one movie to their list, without navigating away in between, it only adds one of those movies (the last one they added), because they are all attributes without real IDs yet

  # I need to check to see if the media exists only within the selected list, not ALL media - that way, too, media cannot be added to a list twice

  # everytime I create new media, it should also fetch the most recent/selected list?, maybe that way, the media will have actual IDs

  # Try doing Media.find_by(data_id: item[:id], created_at: within )

  # List.last.media.find_by(data_id: item[:data_id])

  def media_attributes=(attributes)
    attributes.each do |item|
      if item[:data_id].nil?
        binding.pry
        self.media << Media.last
      else
        self.media << Media.find(item[:id])
      end
    end
  end

end
