class List < ActiveRecord::Base

  has_many :media
  accepts_nested_attributes_for :media

  def media_attributes=(attributes)
    attributes.each do |item|
      if item[:data_id].nil?
        self.media << attributes.map { |item| Media.where(data_id: item[:id]) }
      else
        self.media << attributes.map { |item| Media.find(item[:id]) }
      end
    end
  end
  
end
