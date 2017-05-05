class MediaSerializer < ActiveModel::Serializer
  attributes :id, :title, :data_id, :overview, :poster_path, :release_date, :created_at, :updated_at 

  has_many :media_lists
  has_many :lists, through: :media_lists
end
