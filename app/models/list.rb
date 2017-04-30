class List < ActiveRecord::Base

  has_many :media
  accepts_nested_attributes_for :media
  def media_attributes=(attributes)
    self.media << attributes.map { |item| Media.create(item[:id]) }
    super
  end
end
